using AutoMapper;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;
using WebApi.TransferObjects;
using WebApi.TransferObjects.Body;
using WebApi.TransferObjects.Query;

namespace WebApi.Services
{
    public interface ITaskService
    {
        List<Models.Task> GetAll(FilterTaskParameters query);
        void Create(MetaTask metaTask);
        Models.Task GetById(int id);
        void Delete(Models.Task task);
        void Update(Models.Task task, MetaTask metaTask);
        void PathPriority(Models.Task task, PriorityPatch priority);



    }
    public class TaskService : ITaskService
    {
        private readonly tasklistContext _context;
        private readonly IMapper _mapper;

        public TaskService(tasklistContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public List<Models.Task> GetAll(FilterTaskParameters query)
        {
            query.Title ??= "";
            query.Description ??= "";
            var elements = _context.Tasks
                .Where(task => task.Title.Contains(query.Title) || task.Description.Contains(query.Description))
                .ToList();
            if (query.IsFinished != null)
            {
                elements = elements.Where(task => task.IsFinished == query.IsFinished).ToList();
            }
            return elements
                .OrderByDescending(task => task.Priority)
                .Skip((query.PageNumber - 1) * query.PageSize)
                .Take(query.PageSize)
                .ToList();
        }
        public void Create(MetaTask metaTask)
        {
            var newTask = _mapper.Map<Models.Task>(metaTask);
            _context.Tasks.Add(newTask);
            _context.SaveChanges();
        }
        public Models.Task GetById(int id)
        {
            return _context.Tasks.FirstOrDefault(task => task.Id == id);
        }
        public void Delete(Models.Task task)
        {
            _context.Tasks.Remove(task);
            _context.SaveChanges();
        }
        public void Update(Models.Task task, MetaTask metaTask)
        {
            _mapper.Map(metaTask, task);
            _context.Tasks.Update(task);
            _context.SaveChanges();
        }
        public void PathPriority(Models.Task task, PriorityPatch priority)
        {
            task.Priority = priority.Priority;
            _context.Tasks.Update(task);
            _context.SaveChanges();
        }

    }
}


