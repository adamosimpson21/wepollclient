# Use npm 6.5.0
FROM node:6.5.0
ENV LAST_UPDATED 20181010T000000

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
CMD ["npm","start"]