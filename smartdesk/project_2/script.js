document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("myInput");
    const periods = document.querySelectorAll(".period");
    const dailyRows = document.querySelectorAll("#MON, #TUE, #WED, #THU, #FRI");
    const resetBtn = document.getElementById("resetBtn");
    const shareBtn = document.getElementById("shareBtn");
    const downloadBtn = document.getElementById("downloadBtn");
    const slotButtons = document.querySelectorAll(".slot-btn, .labslot");

    const selectedClass = "selected";
    const activeClass = "active";

    // Utility to show floating messages
    const showMessage = (message) => {
        const messageBox = document.createElement("div");
        messageBox.className = "message-box";
        messageBox.textContent = message;
        document.body.appendChild(messageBox);
        setTimeout(() => {
            messageBox.remove();
        }, 3000);
    };

    // Helper function to get the day and index of a cell
    const getCellLocation = (cell) => {
        const row = cell.closest('tr');
        const day = row.id;
        const index = Array.from(row.querySelectorAll('.period')).indexOf(cell);
        return { day, index };
    };

    // Helper function to check for conflicts
    const hasConflict = (targetCell, selectedCells) => {
        const targetLocation = getCellLocation(targetCell);
        const otherSelectedCells = Array.from(selectedCells).filter(cell => cell !== targetCell);

        return otherSelectedCells.some(selectedCell => {
            const selectedLocation = getCellLocation(selectedCell);

            if (targetLocation.day === selectedLocation.day) {
                const targetText = targetCell.textContent.trim().toUpperCase();
                const selectedText = selectedCell.textContent.trim().toUpperCase();
                const isTargetLab = targetText.includes('L');
                const isSelectedLab = selectedText.includes('L');

                if (isTargetLab && isSelectedLab) {
                    if (targetLocation.index === selectedLocation.index) return true;
                    const targetCellColspan = targetCell.getAttribute('colspan') || 1;
                    const selectedCellColspan = selectedCell.getAttribute('colspan') || 1;
                    const targetRange = [targetLocation.index, targetLocation.index + parseInt(targetCellColspan) - 1];
                    const selectedRange = [selectedLocation.index, selectedLocation.index + parseInt(selectedCellColspan) - 1];
                    
                    if (Math.max(targetRange[0], selectedRange[0]) <= Math.min(targetRange[1], selectedRange[1])) {
                        return true;
                    }
                } else if (isTargetLab || isSelectedLab) {
                    const theoryCell = isTargetLab ? selectedCell : targetCell;
                    const labCell = isTargetLab ? targetCell : selectedCell;
                    const theoryLocation = getCellLocation(theoryCell);
                    const labLocation = getCellLocation(labCell);
                    const labColspan = parseInt(labCell.getAttribute('colspan')) || 1;
                    const labTimeRange = [labLocation.index, labLocation.index + labColspan - 1];
                    if (theoryLocation.index >= labTimeRange[0] && theoryLocation.index <= labTimeRange[1]) {
                        return true;
                    }
                } else {
                    if (targetLocation.index === selectedLocation.index) {
                        return true;
                    }
                }
            }
            return false;
        });
    };

    // --- Highlighting Functionality ---
    const highlightCells = (searchTerm) => {
        periods.forEach(cell => {
            const cellText = cell.textContent.trim().toLowerCase();
            if (searchTerm && cellText.includes(searchTerm) && !cell.classList.contains(selectedClass)) {
                cell.classList.add('highlight');
            } else {
                cell.classList.remove('highlight');
            }
        });
    };

    if (searchInput) {
        searchInput.addEventListener("input", (event) => {
            const searchTerm = event.target.value.trim().toLowerCase();
            highlightCells(searchTerm);
        });
    }

    const updateButtonState = (button) => {
        const buttonText = button.textContent.trim().toUpperCase();
        const slotsToSelect = buttonText.split(' + ').map(s => s.trim());
        const matchingPeriods = Array.from(periods).filter(cell => {
            const cellSlots = cell.textContent.trim().toUpperCase().split(' / ').map(s => s.trim());
            return slotsToSelect.some(slot => cellSlots.includes(slot));
        });
        const allAreSelected = matchingPeriods.length > 0 && matchingPeriods.every(cell => cell.classList.contains(selectedClass));
        button.classList.toggle(activeClass, allAreSelected);
    };

    slotButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const buttonText = event.target.textContent.trim().toUpperCase();
            const slotsToSelect = buttonText.split(' + ').map(s => s.trim());
            const matchingPeriods = Array.from(periods).filter(cell => 
                slotsToSelect.some(slot => {
                    const cellSlots = cell.textContent.trim().toUpperCase().split(' / ').map(s => s.trim());
                    return cellSlots.includes(slot);
                })
            );

            const allAreSelected = matchingPeriods.length > 0 && matchingPeriods.every(cell => cell.classList.contains(selectedClass));
            const anyAreSelected = matchingPeriods.some(cell => cell.classList.contains(selectedClass));

            if (allAreSelected) {
                matchingPeriods.forEach(cell => cell.classList.remove(selectedClass));
                event.target.classList.remove(activeClass);
                showMessage(`Slot "${buttonText}" was unselected.`);
            } else if (anyAreSelected) {
                showMessage(`The slot "${buttonText}" was already partially selected.`);
            } else {
                const alreadySelectedCells = document.querySelectorAll(`.${selectedClass}`);
                let conflictFound = false;

                for (const cell of matchingPeriods) {
                    if (hasConflict(cell, alreadySelectedCells)) {
                        conflictFound = true;
                        break;
                    }
                }

                if (conflictFound) {
                    showMessage("A selected slot is clashing with an already selected slot! Please choose a different time.");
                    return;
                }

                matchingPeriods.forEach(cell => cell.classList.add(selectedClass));
                event.target.classList.add(activeClass);
                showMessage(`Slot "${buttonText}" was selected.`);
            }
        });
    });

    periods.forEach(cell => {
        cell.addEventListener("click", () => {
            const isSelected = cell.classList.contains(selectedClass);
            if (isSelected) {
                cell.classList.remove(selectedClass);
            } else {
                const alreadySelectedCells = document.querySelectorAll(`.${selectedClass}`);
                if (hasConflict(cell, alreadySelectedCells)) {
                    showMessage("This slot is clashing with an already selected slot!");
                    return;
                }
                cell.classList.add(selectedClass);
            }
            slotButtons.forEach(button => updateButtonState(button));
        });
    });

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            periods.forEach(cell => {
                cell.classList.remove(selectedClass);
                cell.classList.remove('highlight');
            });
            slotButtons.forEach(button => {
                button.classList.remove(activeClass);
            });
            if (searchInput) {
                searchInput.value = "";
            }
            periods.forEach(cell => cell.classList.remove('highlight'));
            dailyRows.forEach(row => row.style.display = 'table-row');
            showMessage("All selected slots have been reset!");
        });
    }

    // share button
    if (shareBtn) {
        shareBtn.addEventListener("click", async () => {
            const selectedSlots = Array.from(document.querySelectorAll(".period.selected"))
                .map(cell => cell.textContent.trim().toUpperCase());

            if (selectedSlots.length === 0) {
                showMessage("No slots selected to share!");
                return;
            }

            const encodedSlots = encodeURIComponent(selectedSlots.join(','));
            const shareUrl = `${window.location.origin}${window.location.pathname}?t=${encodedSlots}`;

            try {
                await navigator.clipboard.writeText(shareUrl);
                showMessage("Sharable timetable link copied to clipboard!");
            } catch (err) {
                showMessage("Failed to copy link. Try manually.");
            }

            // Temporarily remove highlight class before capturing
            const highlightedCells = document.querySelectorAll('.highlight');
            highlightedCells.forEach(cell => cell.classList.remove('highlight'));

            const tableContainer = document.querySelector(".table-container");
            const clonedContainer = tableContainer.cloneNode(true);
            const styleTag = document.createElement("style");
            // Changed selected background-color to pink (#FFC0CB) for sharing
            styleTag.textContent = `
                .selected {
                    background-color: #efefeffd !important; /* Changed to pink */
                    color: white !important;
                    font-weight: bold;
                    // box-shadow: inset 0 0 5px rgba(0,0,0,0.5);
                }
                .period {
                    background-color: #e3ffef;
                }
            `;
            clonedContainer.appendChild(styleTag);
            clonedContainer.style.position = 'absolute';
            clonedContainer.style.left = '-9999px';
            const searchBar = document.getElementById("myInput");
            if (searchBar) {
                searchBar.style.display = 'none';
            }
            document.body.appendChild(clonedContainer);

            html2canvas(clonedContainer).then(canvas => {
                document.body.removeChild(clonedContainer); // Clean up

                // Restore highlight class after capturing
                highlightedCells.forEach(cell => cell.classList.add('highlight'));

                if (searchBar) {
                    searchBar.style.display = ''; // Restore the search bar
                }
                
                canvas.toBlob(async (blob) => {
                    try {
                        await navigator.clipboard.write([
                            new ClipboardItem({ "image/png": blob })
                        ]);
                        showMessage("Timetable snapshot copied as image!");
                    } catch (err) {
                        console.error("Failed to copy image:", err);
                        showMessage("Failed to copy image. Try manually.");
                    }
                });
            });
        });
    }

    // Download button
    if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
            // Temporarily remove highlight class before capturing
            const highlightedCells = document.querySelectorAll('.highlight');
            highlightedCells.forEach(cell => cell.classList.remove('highlight'));

            const searchBar = document.getElementById("myInput");
            if (searchBar) {
                searchBar.style.display = 'none';
            }

            const tableHTML = document.querySelector("table").outerHTML;

            const styles = `
                <style>
                    body { font-family: sans-serif; padding:20px; }
                    table { 
                        border-collapse: collapse; 
                        text-align: center;
                        width: 95%;
                        table-layout: fixed;
                        font-size: 0.9rem;
                        font-weight: bolder;
                    }
                    td, th { 
                        border: 2px solid black; 
                        padding: 6px; 
                        font-size: 0.85rem;
                        white-space: normal;
                        word-wrap: break-word;
                        line-height: 1.3;
                        width: 74px;
                        height: 45px;
                        text-align: center;
                        vertical-align: middle;
                    }
                    .selected { 
                        background-color: #95d14e !important; /* This is the dark green from your previous code */
                        color: white; 
                        font-weight: bold; 
                        box-shadow: inset 0 0 5px rgba(0,0,0,0.5);
                    }
                    .day, .prompt {
                        background-color: rgb(173, 173, 173);
                        color: black;
                        font-weight: bold;
                        width: 80px;
                    }
                    .lunch {
                        background-color: #acacac;
                        color: #0c0c0c;
                        border: 2px solid #0d0d0d;
                        width: 50px;
                        font-weight: bolder;
                        font-size: 0.9rem;
                    }
                    .theory_hours { 
                        border: 2px solid black;
                        background-color: rgb(255, 248, 248);
                    }
                    .lab_hours { 
                        border: 2px solid black;
                        background-color: rgb(255, 248, 248);
                    }
                    .period {
                        background-color: #e3ffef;
                    }
                </style>
            `;

            const fullHTML = `
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>FlexiFFCS Timetable</title>
                    ${styles}
                </head>
                <body>
                    ${tableHTML}
                </body>
                </html>
            `;

            const blob = new Blob([fullHTML], { type: "text/html" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "timetable.html";
            link.click();
            URL.revokeObjectURL(link.href);

            // Restore highlight class after download
            highlightedCells.forEach(cell => cell.classList.add('highlight'));
            
            if (searchBar) {
                searchBar.style.display = ''; // Restore the search bar
            }
        });
    }
});