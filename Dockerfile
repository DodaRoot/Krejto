# ============================================
# Stage 1: Build React (client)
# ============================================
FROM node:20-alpine AS client-build-deps
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci

FROM node:20-alpine AS client-build
WORKDIR /app/client
COPY client/ .
COPY --from=client-build-deps /app/client/node_modules ./node_modules
RUN npm run build

# ============================================
# Stage 2: Build Spring Boot (server)
# ============================================
FROM maven:3.9-eclipse-temurin-21 AS server-build
WORKDIR /app/server
COPY server/pom.xml ./
RUN mvn dependency:go-offline
COPY server/src ./src
RUN mvn clean package -DskipTests

# ============================================
# Stage 3: Runtime (Spring Boot + React static)
# ============================================
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

# Copy built React files to Spring Boot static folder
COPY --from=client-build /app/client/build ./static

# Copy Spring Boot JAR
COPY --from=server-build /app/server/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]