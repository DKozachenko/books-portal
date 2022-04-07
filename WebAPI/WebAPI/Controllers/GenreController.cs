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
    public class GenreController : ControllerBase
    {
        private readonly ApplicationContext _db;

        public GenreController(ApplicationContext db)
        {
            _db = db;
        }

        [HttpGet]
        public JsonResult GetAllGenres()
        {
            return new JsonResult(_db.Genres);
        }

        [HttpGet("{id}")]
        public JsonResult GetGenre(long Id)
        {
            var RequiredGenre = _db.Genres.Include(G => G.Books).SingleOrDefault(G => G.Id == Id);
            return new JsonResult(RequiredGenre);
        }

        [HttpPost]
        public JsonResult AddGenre(Genre NewGenre)
        {
            if (NewGenre != null)
            {
                var AddedBooks = NewGenre.Books;
                NewGenre.Books = new List<Book>();


                foreach (var AddBook in AddedBooks)
                {
                    var ExistedBook = _db.Books.SingleOrDefault(B => B.Id == AddBook.Id);

                    if (ExistedBook != null)
                    {
                        NewGenre.Books.Add(ExistedBook);
                    }

                }

                _db.Genres.Add(NewGenre);
                _db.SaveChanges();
            }

            return new JsonResult(NewGenre);
        }

        [HttpPut]
        public JsonResult UpdateGenre(Genre UpdatedGenre)
        {
            if (UpdatedGenre != null)
            {
                _db.Entry(UpdatedGenre).State = EntityState.Detached;

                var ExistedGenre = _db.Genres.Include(G => G.Books).SingleOrDefault(G => G.Id == UpdatedGenre.Id);

                ExistedGenre.Name = UpdatedGenre.Name;

                var UpdatedBooks = UpdatedGenre.Books;

                if (UpdatedBooks != null)
                {
                    ExistedGenre.Books.Clear();

                    foreach (var UpdateBook in UpdatedBooks)
                    {
                        var ExistedBook = _db.Books.SingleOrDefault(B => B.Id == UpdateBook.Id);

                        if (ExistedBook != null)
                        {
                            ExistedGenre.Books.Add(ExistedBook);
                        }

                    }
                    _db.Genres.Update(ExistedGenre);
                    _db.SaveChanges();
                }
            }

            return new JsonResult(UpdatedGenre);
        }
        [HttpDelete]
        public JsonResult DeleteAllGenres()
        {
            foreach (var CurrentGenre in _db.Genres)
            {
                _db.Genres.Remove(CurrentGenre);
            }
            _db.SaveChanges();
            return new JsonResult(null);

        }

        [HttpDelete("{id}")]
        public JsonResult DeleteGenre(long Id)
        {
            var RequiredGenre = _db.Genres.SingleOrDefault(G => G.Id == Id);
            if (RequiredGenre != null)
            {
                _db.Genres.Remove(RequiredGenre);
                _db.SaveChanges();
            }
            
            return new JsonResult(RequiredGenre);
        }
    }
}
