FROM nginx:alpine

COPY pages/index.html /usr/share/nginx/html/index.html
COPY images/ /usr/share/nginx/html/images/
COPY style/index.css /usr/share/nginx/html/style/index.css
COPY script/script.js /usr/share/nginx/html/script/script.js

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
