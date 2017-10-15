using System;
using System.Collections.Generic;

namespace reboot_server.Data.Abstraction
{
    // ## generic interface for all repo classes
    // Storage will be simple and object level

    // ## this will need special care when registering in the DI container to handle the generics
    // ## this has some advice https://ardalis.com/registering-open-generics-in-aspnet-core-dependency-injection
    // if it comes to it we can always replace the DI container
 
    public interface IRepository<T>
    {
        int Set(T obj);
        T Get(int id);
        List<T> GetList();
    }
}
