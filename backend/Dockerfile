FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV MONGO_URL = mongodb+srv://risav:vFJaj41UvsMcLOvo@cluster0.dp6ubq2.mongodb.net/
ENV JWT_SECRET = sdjkfh8923yhjdksbfma234214$^$^hjb2qiuhesdbhjdsfg839ujkdhfjk
ENV PORT = 8080
EXPOSE 8080
CMD ["npm","start"]