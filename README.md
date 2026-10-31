Patas que Transformam
Guia de instalação e execução local
Este guia explica como preparar o projeto em um computador novo,
configurar o MariaDB e executar o backend Python. As instruções
consideram Windows.
1. Pré-requisitos
Instale: - Python: https://www.python.org/downloads/ - MariaDB Server:
https://mariadb.org/download/ - Visual Studio Code (recomendado):
https://code.visualstudio.com/ - HeidiSQL (opcional, para administrar o
banco): https://www.heidisql.com/download.php

Durante a instalação do MariaDB, defina uma senha e guarde-a. Ela será
usada na configuração do projeto.
2. Baixar e abrir o projeto
1. Baixe o ZIP do repositório no GitHub e extraia-o.
2. Abra a pasta principal do projeto no Visual Studio Code.
3. Abra Terminal → Novo Terminal.
4. Execute os comandos deste guia na pasta principal, onde estão os
   arquivos HTML e as pastas backend e js.
3. Criar e ativar o ambiente virtual
No terminal:
py -m venv venv
Ative-o:
.\venv\Scripts\Activate.ps1
Se o PowerShell bloquear a ativação, execute:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Confirme, se solicitado, e tente ativar novamente. Quando estiver ativo,
normalmente aparecerá (venv) no início da linha do terminal.
4. Instalar as dependências
Na pasta principal, crie ou confira o arquivo requirements.txt com:
Flask
Flask-Cors
mariadb
python-dotenv
Instale as bibliotecas:
py -m pip install -r requirements.txt
5. Criar o banco e as tabelas
1. Inicie o serviço do MariaDB Server.
2. Abra o HeidiSQL e conecte ao servidor. Em uma instalação local,
   normalmente:
   - Host: 127.0.0.1
   - Porta: 3306
   - Usuário: o configurado na instalação (por exemplo, root)
   - Senha: a senha definida durante a instalação.
3. Abra o arquivo database/patas_que_transformam.sql em uma nova aba
   de consulta do HeidiSQL.
4. Execute o script (normalmente com F9).
O script cria o banco patas_que_transformam e as tabelas
resultados_questionario e respostas_questionario.

Observação: o script de estrutura cria tabelas vazias. Ele não
transfere resultados de questionários já cadastrados em outro
computador.
6. Configurar a conexão
Na pasta principal do projeto, crie um arquivo chamado .env com os
dados da instalação local:
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_do_mariadb
DB_NAME=patas_que_transformam
Substitua sua_senha_do_mariadb pela senha definida no MariaDB. Se
utilizar outro usuário, ajuste DB_USER.

Não envie o arquivo .env ao GitHub: ele contém credenciais e deve
permanecer listado no .gitignore.

O arquivo .env.example pode ser compartilhado como modelo, sem senha
real:
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=patas_que_transformam
Cada integrante deve criar seu próprio .env e preencher sua senha
local.
7. Iniciar o backend
Antes de iniciar, confirme que o MariaDB está em execução, que o SQL foi
executado, que o .env está preenchido e que o ambiente virtual está
ativo.

Na pasta principal, execute:
py backend/app.py
Mantenha o terminal aberto enquanto utilizar o site. Por padrão, o
backend local ficará em http://127.0.0.1:5000.
8. Testar o backend e a conexão com o banco
Com o backend em execução, abra no navegador:
  Endereço                                O que verifica
  http://127.0.0.1:5000/                  Se o backend iniciou

  http://127.0.0.1:5000/api/status        Se a API responde
http://127.0.0.1:5000/api/teste-banco   Se a conexão com MariaDB funciona
No último endereço, a resposta esperada informa que a conexão com o
MariaDB foi realizada com sucesso.
9. Abrir e testar o site
1. Com o backend ainda em execução, abra index.html no navegador ou
   use a extensão Live Server do VS Code.
2. Acesse a página do questionário, responda e finalize.
3. Verifique se o site informa que as respostas foram enviadas com
   sucesso.
Para conferir os registros no HeidiSQL, execute:
USE patas_que_transformam;

SELECT * FROM resultados_questionario;

SELECT * FROM respostas_questionario;
10. Checklist
- [ ] Python instalado.
- [ ] MariaDB Server instalado e em execução.
- [ ] ZIP extraído e pasta principal aberta.
- [ ] Ambiente virtual criado e ativado.
- [ ] Dependências instaladas.
- [ ] Script SQL executado.
- [ ] Arquivo .env criado com as credenciais locais.
- [ ] Backend iniciado com py backend/app.py.
- [ ] Endereço /api/teste-banco confirmou a conexão.
- [ ] Site e questionário testados.
Observações
- O HeidiSQL é uma ferramenta de administração; quem armazena os dados
  é o MariaDB Server.
- A pasta venv e o arquivo .env são locais e não devem ser
  enviados ao repositório.
- Para transferir também os registros existentes, é necessário gerar
  um backup de dados; o SQL de estrutura não os inclui.
- O endereço 127.0.0.1 funciona apenas no próprio computador. Para
  publicar o site na internet, será necessário hospedar o backend e o
  banco e configurar o endereço público da API.
- Se o questionário não enviar os dados, confira se o backend continua
  em execução e se a URL configurada no JavaScript corresponde ao
  servidor utilizado.
