FROM gradle:jdk21
# Set timezone
ENV TZ=Asia/Tokyo

# Set working directory
WORKDIR /app

# Copy gradle files
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Make gradlew executable
RUN chmod +x ./gradlew

# Download dependencies
RUN ./gradlew dependencies --no-daemon

# Copy source code
COPY src src

# Build the application
RUN export $(cat .env | grep -v '^#' | xargs) && \
    ./gradlew build --no-daemon

# Create runtime image
FROM gradle:jdk21

# Set timezone
ENV TZ=Asia/Tokyo

# Set working directory
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=0 /app/build/libs/*.jar app.jar

# Expose port
EXPOSE 3000

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]