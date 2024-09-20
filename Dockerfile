FROM golang:1.20

WORKDIR /go/src
ENV PATH="/go/bin:${PATH}"

# Instalação de dependências Go e ferramentas adicionais
# RUN go install github.com/spf13/cobra-cli@latest
# RUN go install github.com/golang/mock/mockgen@v1.5.0
# RUN go install github.com/spf13/cobra-cli@latest

# Instalação do SQLite
RUN apt-get update && apt-get install sqlite3 -y

# Ajustes de permissões para o usuário www-data
RUN usermod -u 1000 www-data
RUN mkdir -p /var/www/.cache
RUN chown -R www-data:www-data /go
RUN chown -R www-data:www-data /var/www/.cache

# Define o usuário www-data para execução
USER www-data

# Mantém o container em execução (para desenvolvimento)
CMD ["tail", "-f", "/dev/null"]