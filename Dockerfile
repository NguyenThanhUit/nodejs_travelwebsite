
FROM node:18


RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    libssl-dev \
    libodbc1 \
    odbcinst \
    odbcinst1debian2 \
    unixodbc-dev


WORKDIR /app

COPY .env /app/



COPY package*.json ./


RUN npm install --no-optional

COPY certs/ /app/certs/

COPY . .


EXPOSE 3001


CMD ["node", "src/index.js"]