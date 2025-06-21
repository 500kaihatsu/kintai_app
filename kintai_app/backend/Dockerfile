FROM openjdk:17-jdk-slim
WORKDIR /app

RUN apt-get update && apt-get install -y netcat

# Maven関連を先にコピー（ビルドキャッシュ活用のため）
COPY .mvn .mvn
COPY mvnw .

# wait-for-it.sh をコピーして実行権限を付与
COPY wait-for-it.sh .
RUN chmod +x wait-for-it.sh mvnw

# 残りをコピー
COPY . .

# ビルド実行
RUN ./mvnw package -DskipTests

CMD ["./wait-for-it.sh", "db", "5432", "--", "java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]

