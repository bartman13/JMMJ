using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;
using WebApi.Services;
using WebApi.TransferObjects;
using WebApi.TransferObjects.Body;
using WebApi.TransferObjects.Query;
using Task = WebApi.Models.Task;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JmmjController : ControllerBase
    {

        private readonly ITaskService _tastService;
        public JmmjController(ITaskService taskService)
        {
            _tastService = taskService;
        }
        /// <summary>
        /// Returns All tasks ordered by priority 
        /// </summary>
        /// <returns> List of elements </returns>
        [HttpGet]
        public IActionResult GetTask([FromQuery] FilterTaskParameters query)
        {
            return Ok(_tastService.GetAll(query));
        }
        /// <summary>
        /// Create new Task 
        /// </summary>
        /// <returns> Info about operation </returns>
        [HttpPost]
        public IActionResult AddTask([FromBody] MetaTask newTask)
        {
            if (newTask == null)
            {
                return BadRequest("Owner object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid task object");
            }
            _tastService.Create(newTask); // error handling in /Helpers/ErrorHandlerMiddleware            
            return Ok("Added succesfully");
        }
        /// <summary>
        /// Delete  Task 
        /// </summary>
        /// <returns> Info about operation </returns>
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var task = _tastService.GetById(id);
            if (task == null)
            {
                return NotFound("Element not found");
            }
            _tastService.Delete(task);
            return Ok("Deleted succesfully");
        }
        /// <summary>
        /// Update Task whith speciffic id 
        /// </summary>
        /// <returns> Info about operation </returns>
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] MetaTask updateData)
        {
            var task = _tastService.GetById(id);
            if (task == null)
            {
                return NotFound("Element not found");
            }
            _tastService.Update(task, updateData);
            return Ok("Updated succesfully");
        }
        /// <summary>
        /// Set priority  
        /// </summary>
        /// <returns> If operation success </returns>
        [HttpPatch("{id}")]
        public IActionResult SetPriority(int id, [FromQuery] PriorityPatch patchPriority)
        {
            var task = _tastService.GetById(id);
            if (task == null || patchPriority == null)
            {
                return NotFound("Element not found");
            }
            _tastService.PathPriority(task, patchPriority);
            return Ok("Updated succesfully");

        }
    }
}
