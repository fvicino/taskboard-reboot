using System;
using System.Collections.Generic;

namespace reboot_server.Data.Abstraction
{
    // ## generic interface for all repo classes
    // ## this will need care when registering in the DI container to handle the generics
    // ## this has some advice https://ardalis.com/registering-open-generics-in-aspnet-core-dependency-injection
 
    public interface IRepository<T>
    {
        int Set(T obj);
        T Get(int id);
        List<T> GetList();
    }
}
