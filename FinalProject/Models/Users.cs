using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProject.Models
{
    public class Users
    {
        public int uId { get; set; }
        public string uName { get; set; }
        public string pwd { get; set; }
        public float balance { get; set; }


        private void addNewUser(string uName, string pwd, float balance)
        {

            //open db connection

            


            //Check for blanks/ or incorrect values
            if (String.IsNullOrEmpty(uName) || float.TryParse( balance.ToString(), out balance))
            {
                //return error
            }
            else
            {
                //Query database for uName

                //(SELECT * From Users WHERE username = '"uName"'

                /*check if uName already exists */
                //if (uName)
                //{

                //}
                //else
                //{
                //    //Add user to the database
                //}
            }


        }

    }
}
