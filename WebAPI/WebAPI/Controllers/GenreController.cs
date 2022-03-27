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
            var RequiredGenre = _db.Genres.SingleOrDefault(G => G.Id == Id);
            return new JsonResult(RequiredGenre);
        }

        [HttpPost]
        public JsonResult AddGenre(Genre NewGenre)
        {
            _db.Genres.Add(NewGenre);
            _db.SaveChanges();
            return new JsonResult(NewGenre);
        }

        [HttpPut]
        public JsonResult UpdateGenre(Genre UpdatedGenre)
        {
            _db.Genres.Update(UpdatedGenre);
            _db.SaveChanges();
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
            _db.Genres.Remove(RequiredGenre);
            _db.SaveChanges();
            return new JsonResult(RequiredGenre);
        }
    }
}
