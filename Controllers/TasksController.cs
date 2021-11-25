using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using tasker.Models;

namespace tasker.Controllers
{
    [Route("api/admin/tasks")]
    [ApiController]
    public class TasksController : Controller
    {
         private readonly IConfiguration _configuration;

         public TasksController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select * from dbo.Tasks";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TaskerConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
         [HttpPost]
        public JsonResult Post(Tasks user)
        {
            string query =  @"
                    insert into dbo.Tasks (TaskDesc,StartDate,EndDate,AssignedUserEmail,Category,Priority,Status,ResolvedDesc)
                    values
                    (
                    '" + user.TaskDesc + @"'
                    ,'" + user.StartDate + @"'
                    ,'" + user.EndDate + @"'
                    ,'" + user.AssignedUserEmail + @"'
                    ,'" + user.Category + @"'
                    ,'" + user.Priority + @"'
                    ,'" + user.Status + @"'
                    ,'" + user.ResolvedDesc + @"'
                    )";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TaskerConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Task Created Successfully!");
        }

        [HttpPut]
        public JsonResult Put(Tasks user)
        {
            string query = @"
                   update dbo.Tasks set
                    TaskDesc = '" + user.TaskDesc + @"'
                    ,StartDate = '" + user.StartDate + @"'
                    ,EndDate = '" + user.EndDate + @"'
                    ,AssignedUserEmail = '" + user.AssignedUserEmail + @"'
                    ,Category = '" + user.Category + @"'
                    ,Priority = '" + user.Priority + @"'
                    ,Status = '" + user.Status + @"'
                    ,ResolvedDesc = '" + user.ResolvedDesc + @"'
                    where TaskId = '" + user.TaskId + @"'
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TaskerConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Task Updated Successfully!");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.Tasks
                    where TaskId=" + id + @"
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TaskerConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Task Deleted Successfully!");
        }

    
    }
}