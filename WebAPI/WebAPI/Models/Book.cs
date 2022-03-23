using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Book
    {
        [Required]
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Title { get; set; }
        [Required]
        [MaxLength(512)]
        public string Description { get; set; }
        [Required]
        public DateTime DatePublication { get; set; }
        [Required]
        public int Size { get; set; }
        public int AgeLimit { get; set; }
        
    }
}
