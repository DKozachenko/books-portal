﻿using Microsoft.AspNetCore.Http;
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
    public class AuthorController : ControllerBase
    {
        private readonly ApplicationContext _db;

        public AuthorController(ApplicationContext db)
        {
            _db = db;
        } 

        [HttpGet]
        public JsonResult GetAllAuthors()
        {
            return new JsonResult(_db.Authors);
        }

        [HttpGet("{id}")]
        public JsonResult GetAuthor(long Id)
        {
            var RequiredAuthor = _db.Authors.SingleOrDefault(A => A.Id == Id);
            return new JsonResult(RequiredAuthor);
        }

        [HttpPost]
        public JsonResult AddAuthor(Author NewAuthor)
        {
            if (NewAuthor != null)
            {
                var AddedBooks = NewAuthor.Books;
                NewAuthor.Books = new List<Book>();


                foreach (var AddBook in AddedBooks)
                {
                    var ExistedBook = _db.Books.SingleOrDefault(B => B.Id == AddBook.Id);

                    if (ExistedBook != null)
                    {
                        NewAuthor.Books.Add(ExistedBook);
                    }
                    
                }

                _db.Authors.Add(NewAuthor);
                _db.SaveChanges();
            }
            
            return new JsonResult(NewAuthor);
        }

        [HttpPut]
        public JsonResult UpdateAuthor(Author UpdatedAuthor)
        {
            if (UpdatedAuthor != null)
            {
                var UpdatedBooks = UpdatedAuthor.Books;
                UpdatedAuthor.Books = new List<Book>();


                foreach (var UpdateBook in UpdatedBooks)
                {
                    var ExistedBook = _db.Books.SingleOrDefault(B => B.Id == UpdateBook.Id);

                    if (ExistedBook != null)
                    {
                        UpdatedAuthor.Books.Add(ExistedBook);
                    }

                }

                _db.Authors.Update(UpdatedAuthor);
                _db.SaveChanges();
            }

            
            return new JsonResult(UpdatedAuthor);
        }
        [HttpDelete]
        public JsonResult DeleteAllAuthors()
        {
            foreach (var CurrentAuthor in _db.Authors)
            {
                _db.Authors.Remove(CurrentAuthor);
            }
            _db.SaveChanges();
            return new JsonResult(null);

        }

        [HttpDelete("{id}")]
        public JsonResult DeleteAuthor(long Id)
        {
            var RequiredAuthor = _db.Authors.SingleOrDefault(A => A.Id == Id);
            _db.Authors.Remove(RequiredAuthor);
            _db.SaveChanges();
            return new JsonResult(RequiredAuthor);
        }

    }
}
