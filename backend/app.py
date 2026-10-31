
from flask import Flask, jsonify, request
from flask_cors import CORS
import mariadb
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)


def conectar_banco():
    return mariadb.connect(
        host=os.getenv("DB_HOST"),
        port=int(os.getenv("DB_PORT")),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )


@app.route("/")
def inicio():
    return "Patas que Transformam - Backend funcionando!"


@app.route("/api/status")
def verificar_status():
    return jsonify({
        "status": "sucesso",
        "mensagem": "API do Patas que Transformam funcionando!"
    })


@app.route("/api/teste-banco")
def testar_banco():
    conexao = None

    try:
        conexao = conectar_banco()

        return jsonify({
            "status": "sucesso",
            "mensagem": "Conexão com MariaDB realizada com sucesso!"
        })

    except mariadb.Error:
        return jsonify({
            "status": "erro",
            "mensagem": "Não foi possível conectar ao MariaDB."
        }), 500

    finally:
        if conexao:
            conexao.close()


@app.route("/api/questionario", methods=["POST"])
def receber_questionario():
    dados = request.get_json()

    if not dados:
        return jsonify({
            "status": "erro",
            "mensagem": "Nenhum dado foi enviado."
        }), 400

    pontuacao = dados.get("pontuacao")
    total_perguntas = dados.get("totalPerguntas")
    percentual = dados.get("percentualAcertos")
    respostas = dados.get("respostas")

    if (
        not isinstance(pontuacao, int)
        or not isinstance(total_perguntas, int)
        or not isinstance(respostas, list)
        or not isinstance(percentual, (int, float))
        or len(respostas) != total_perguntas
        or not 0 <= pontuacao <= total_perguntas
    ):
        return jsonify({
            "status": "erro",
            "mensagem": "Os dados enviados são inválidos."
        }), 400

    conexao = None
    cursor = None

    try:
        conexao = conectar_banco()
        cursor = conexao.cursor()

        cursor.execute("""
            INSERT INTO resultados_questionario
            (pontuacao, total_perguntas, percentual_acertos)
            VALUES (?, ?, ?)
        """, (pontuacao, total_perguntas, percentual))

        resultado_id = cursor.lastrowid

        for numero, resposta in enumerate(respostas, start=1):
            cursor.execute("""
                INSERT INTO respostas_questionario
                (resultado_id, numero_pergunta, pergunta,
                 resposta_escolhida, acertou)
                VALUES (?, ?, ?, ?, ?)
            """, (
                resultado_id,
                numero,
                resposta.get("pergunta"),
                resposta.get("respostaEscolhida"),
                resposta.get("acertou")
            ))

        conexao.commit()

        return jsonify({
            "status": "sucesso",
            "mensagem": "Questionário salvo no banco de dados!",
            "resultado_id": resultado_id
        }), 201

    except (mariadb.Error, TypeError, ValueError):
        if conexao:
            conexao.rollback()

        return jsonify({
            "status": "erro",
            "mensagem": "Não foi possível salvar o questionário."
        }), 500

    finally:
        if cursor:
            cursor.close()

        if conexao:
            conexao.close()


if __name__ == "__main__":
    app.run(debug=True)
