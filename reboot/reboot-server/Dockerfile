FROM microsoft/aspnetcore:2.0
ARG source
WORKDIR /app
EXPOSE 4430
COPY ${source:-obj/Docker/publish} .
ENTRYPOINT ["dotnet", "reboot-server.dll"]