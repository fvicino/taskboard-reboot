using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace reboot_server
{
    public class Program
    {
        public static void Main(string[] args)
        {


            var host = new WebHostBuilder()

                //## make local cert/key/pfx for development using openssl see here: https://community.finicity.com/s/article/208775666-Creating-X-509-Keys
                //## see here https://github.com/aspnet/Docs/blob/master/aspnetcore/fundamentals/servers/kestrel/sample2/Program.cs
                //   for example of configuring Kestrel for SSL that works, the API has been changing alot !!

                //## Configure Kestrell to use ssl on port 5001
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseKestrel(options =>
                {
                    options.Listen(IPAddress.Loopback, 4430, listenOptions =>
                    {
                        listenOptions.UseHttps("dev.pfx", "Mmm..butter!");
                    });
                })
                .UseStartup<Startup>()
                .Build();

            host.Run();

        }
    }
}
