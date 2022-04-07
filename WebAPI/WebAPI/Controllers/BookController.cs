using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            var RequiredBook = _db.Books.Include(B => B.Writers).Include(B => B.Genres).SingleOrDefault(B => B.Id == Id);
            return new JsonResult(RequiredBook);
        }

        [HttpPost]
        public JsonResult AddBook(Book NewBook)
        {
            if (NewBook != null)
            {
                var AddedWriters = NewBook.Writers;
                NewBook.Writers = new List<Author>();
                foreach (var AddWriter in AddedWriters)
                {
                    var ExistedWriter = _db.Authors.SingleOrDefault(B => B.Id == AddWriter.Id);

                    if (ExistedWriter != null)
                    {
                        NewBook.Writers.Add(ExistedWriter);
                    }

                }

                var AddedGenres = NewBook.Genres;
                NewBook.Genres = new List<Genre>();
                foreach (var AddGenre in AddedGenres)
                {
                    var ExistedGenre = _db.Genres.SingleOrDefault(B => B.Id == AddGenre.Id);

                    if (ExistedGenre != null)
                    {
                        NewBook.Genres.Add(ExistedGenre);
                    }

                }


                _db.Books.Add(NewBook);
                _db.SaveChanges();
            }
            
            return new JsonResult(NewBook);
        }

        [HttpPut]
        public JsonResult UpdateBook(Book UpdatedBook)
        {
            if (UpdatedBook != null)
            {
                _db.Entry(UpdatedBook).State = EntityState.Detached;
                var ExistedBook = _db.Books.Include(B => B.Writers).Include(B => B.Genres).SingleOrDefault(B => B.Id == UpdatedBook.Id);

                ExistedBook.Title = UpdatedBook.Title;
                ExistedBook.Description = UpdatedBook.Description;
                ExistedBook.DatePublication = UpdatedBook.DatePublication;
                ExistedBook.Size = UpdatedBook.Size;
                ExistedBook.AgeLimit = UpdatedBook.AgeLimit;

                var UpdatedWriters = UpdatedBook.Writers;

                if (UpdatedWriters != null)
                {
                    ExistedBook.Writers.Clear();

                    foreach (var UpdateWriter in UpdatedWriters)
                    {
                        var ExistedWriter = _db.Authors.SingleOrDefault(A => A.Id == UpdateWriter.Id);

                        if (ExistedBook != null)
                        {
                            ExistedBook.Writers.Add(ExistedWriter);
                        }

                    }
                    
                }

                var UpdatedGenres = UpdatedBook.Genres;

                if (UpdatedGenres != null)
                {
                    ExistedBook.Genres.Clear();

                    foreach (var UpdateGenre in UpdatedGenres)
                    {
                        var ExistedGenre = _db.Genres.SingleOrDefault(G => G.Id == UpdateGenre.Id);

                        if (ExistedBook != null)
                        {
                            ExistedBook.Genres.Add(ExistedGenre);
                        }

                    }

                }

                _db.Books.Update(ExistedBook);
                _db.SaveChanges();
            }
            
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
            if (RequiredBook != null)
            {
                _db.Books.Remove(RequiredBook);
                _db.SaveChanges();
            }
            
            return new JsonResult(RequiredBook);
        }
    }
}
