# aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/e4y1j9y5
docker build -t testing_pipeline:1.0 .
# docker tag testing_pipeline:latest public.ecr.aws/e4y1j9y5/testing_pipeline:latest
# docker push public.ecr.aws/e4y1j9y5/testing_pipeline:latest
docker run --name testing_container -p 8080:8080 -d testing_pipeline:1.0
