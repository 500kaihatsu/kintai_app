FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY . .
RUN chmod +x mvnw

# Maven Wrapper に実行権限を追加
RUN chmod +x ./mvnw

# テストはスキップしてビルド（ビルドエラー回避のため先に依存解決）
RUN ./mvnw clean package -DskipTests

EXPOSE 8080

CMD ["./mvnw", "-X", "spring-boot:run"]

