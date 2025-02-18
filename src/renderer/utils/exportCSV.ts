export function exportTradesToCSV(trades: any[]) {
    const headers = "Symbol,Entry Price,Exit Price,Profit/Loss,Date,Strategy,Notes\n";
    const csvRows = trades.map((t) =>
      [t.symbol, t.entryPrice, t.exitPrice || "Open", t.profitLoss || "Pending", t.date, t.strategy, t.notes].join(",")
    );
    const csvData = headers + csvRows.join("\n");
  
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "trading-journal.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  