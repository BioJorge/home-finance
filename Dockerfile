# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos package.json e package-lock.json (se disponível)
COPY package*.json ./

# Instale as dependências do projeto, incluindo as de desenvolvimento
RUN npm install

# Copie os arquivos do projeto para o container
COPY . .

# Copie o arquivo .env para o container (se necessário)
COPY .env .env

# Instale o dotenv explicitamente
RUN npm install dotenv

# Construa a aplicação para produção
RUN npm run build

# Expõe a porta que o Next.js usa por padrão
EXPOSE 3000

# Define a variável de ambiente para produção
ENV NODE_ENV production

# Inicia a aplicação
CMD ["npm", "start"]