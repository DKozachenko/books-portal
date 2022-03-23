using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Author
    {
        [Required]
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(100)]
        public string LastName { get; set; }
        [Required]
        public DateTime DateBirth { get; set; }
        [Required]
        [MaxLength(768)]
        public string AboutText { get; set; }
        public string Country { get; set; }
    }
}
