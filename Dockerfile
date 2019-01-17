# Use npm 8.11.3
FROM node:8.11.3
ENV LAST_UPDATED 20181228T000000

# Copy source code
COPY . /wepollclient

# Change working directory
WORKDIR /wepollclient

# Install dependencies
RUN npm install

# Expose API port to the outside
EXPOSE 8080

# Any environment variables
ENV REACT_APP_ENV_TYPE development

# Launch application
CMD ["npm start"]