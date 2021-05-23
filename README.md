#Client klasörüne gir/// docker build -f Dockerfile.dev -t project/client . ///// docker run -it -p 4002:3000 project/client

#server klasörü /// docker build -f Dockerfile.dev -t project/server . //// docker run -it -p 4003:5000 project/server

#ana klasöre git/// docker-compose up --build