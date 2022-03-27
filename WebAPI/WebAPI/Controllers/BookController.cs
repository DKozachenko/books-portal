using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly ApplicationContext _db;

        public BookController(ApplicationContext db)
        {
            _db = db;
        }

        [HttpGet]
        public JsonResult GetAllBooks()
        {
            return new JsonResult(_db.Books);
        }

        [HttpGet("{id}")]
        public JsonResult GetBook(long Id)
        {
            var RequiredBook = _db.Books.SingleOrDefault(B => B.Id == Id);
            return new JsonResult(RequiredBook);
        }

        [HttpPost]
        public JsonResult AddBook(Book NewBook)
        {
            _db.Books.Add(NewBook);
            _db.SaveChanges();
            return new JsonResult(NewBook);
        }

        [HttpPut]
        public JsonResult UpdateBook(Book UpdatedBook)
        {
            _db.Books.Update(UpdatedBook);
            _db.SaveChanges();
            return new JsonResult(UpdatedBook);
        }
        [HttpDelete]
        public JsonResult DeleteAllBooks()
        {
            foreach (var CurrentBook in _db.Books)
            {
                _db.Books.Remove(CurrentBook);
            }
            _db.SaveChanges();
            return new JsonResult(null);

        }

        [HttpDelete("{id}")]
        public JsonResult DeleteBook(long Id)
        {
            var RequiredBook = _db.Books.SingleOrDefault(B => B.Id == Id);
            _db.Books.Remove(RequiredBook);
            _db.SaveChanges();
            return new JsonResult(RequiredBook);
        }
    }
}
