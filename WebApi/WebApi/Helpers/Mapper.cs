using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using WebApi.Models;
using WebApi.TransferObjects.Body;

namespace WebApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Task, MetaTask>()
               .ReverseMap();
        }
    }
}