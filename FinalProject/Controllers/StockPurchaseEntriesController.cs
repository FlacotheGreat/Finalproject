using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using FinalProject.Models;

namespace FinalProject.Controllers
{
    
    public class StockPurchaseEntryController : Controller
    {
        private readonly FinalProjectContext _context;
        public Stocks data = new Stocks();

        public StockPurchaseEntryController(FinalProjectContext context)
        {
            _context = context;
        }

        // GET: StockPurchaseEntry
        public async Task<IActionResult> Index()
        {
            var finalProjectContext = _context.StockPurchaseEntry.Include(s => s.Users);
            return View(await finalProjectContext.ToListAsync());
        }

        // GET: StockPurchaseEntry/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var stockPurchaseEntry = await _context.StockPurchaseEntry
                .Include(s => s.Users)
                .SingleOrDefaultAsync(m => m.Id == id);
            if (stockPurchaseEntry == null)
            {
                return NotFound();
            }

            return View(stockPurchaseEntry);
        }

        // GET: StockPurchaseEntry/Create
        
        public IActionResult Create(int id)
        {
            
            Console.WriteLine("\n\n" + id + "\n\n");

            //Passes UsersId into the view
            data.UsersId = id;

            return View(data);
        }

        // POST: StockPurchaseEntry/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("UsersId,stock1,stock2,stock3")]
        Stocks stock)
        {
           
            StockPurchaseEntry UserEntry = new StockPurchaseEntry();

            UserEntry.UsersId = stock.UsersId;
            for (int i = 1; i <=3; i++)
            {
                if (i == 1)
                {
                   UserEntry.Company_Name = stock.stock1;
                }
                else if (i == 2)
                {
                   UserEntry.Company_Name = stock.stock2;
                }
                else if (i == 3)
                {
                   UserEntry.Company_Name = stock.stock3;
                }

                //

                break;
            }
            /*[Bind("UsersId,Company_Name,Purchased_Amount,Amount_Paid")]
        StockPurchaseEntry stockPurchaseEntry
        /*
            if (ModelState.IsValid)
            {
                _context.Add(stockPurchaseEntry);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["UsersId"] = new SelectList(_context.Users, "Id", "Id", stockPurchaseEntry.UsersId);*/

            Console.WriteLine("This is the User" + stock.UsersId + "Stock 1:" + stock.stock1 + "Stock 2:" + stock.stock2 + "Stock 3:" + stock.stock3);


            return View();
        }

        // GET: StockPurchaseEntry/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var stockPurchaseEntry = await _context.StockPurchaseEntry.SingleOrDefaultAsync(m => m.Id == id);
            if (stockPurchaseEntry == null)
            {
                return NotFound();
            }
            ViewData["UsersId"] = new SelectList(_context.Users, "Id", "Id", stockPurchaseEntry.UsersId);
            return View(stockPurchaseEntry);
        }

        // POST: StockPurchaseEntry/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("UsersId,Company_Name,Purchased_Amount, Amount_Paid")] StockPurchaseEntry stockPurchaseEntry)
        {
            if (id != stockPurchaseEntry.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(stockPurchaseEntry);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!StockPurchaseEntryExists(stockPurchaseEntry.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["UsersId"] = new SelectList(_context.Users, "Id", "Id", stockPurchaseEntry.UsersId);
            return View(stockPurchaseEntry);
        }

        // GET: StockPurchaseEntry/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var stockPurchaseEntry = await _context.StockPurchaseEntry
                .Include(s => s.Users)
                .SingleOrDefaultAsync(m => m.Id == id);
            if (stockPurchaseEntry == null)
            {
                return NotFound();
            }

            return View(stockPurchaseEntry);
        }

        // POST: StockPurchaseEntry/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var stockPurchaseEntry = await _context.StockPurchaseEntry.SingleOrDefaultAsync(m => m.Id == id);
            _context.StockPurchaseEntry.Remove(stockPurchaseEntry);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool StockPurchaseEntryExists(int id)
        {
            return _context.StockPurchaseEntry.Any(e => e.Id == id);
        }
    }
}
