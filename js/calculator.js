function updateCalculator() {
            let total = 0;
            let messageBase = "";

            // 1. Get Base Size Price
            const selectedSize = document.querySelector('input[name="size"]:checked');
            const basePrice = parseFloat([25, 45, 90][Array.from(sizeInputs).indexOf(selectedSize)]); // Mapping values to prices if needed, or use logic below
            
            // Logic based on value in HTML (simple mapping for this demo)
            let currentBasePrice = 0;
            if(selectedSize.value === '12') currentBasePrice = 25;
            if(selectedSize.value === '24') currentBasePrice = 45;
            if(selectedSize.value === '50') currentBasePrice = 90;

            total += currentBasePrice;

            // Update UI Summary
            outSize.textContent = `Ramo de ${selectedSize.value} Rosas`;
            outSizePrice.textContent = `$${currentBasePrice.toFixed(2)}`;
            outColor.textContent = colorInput.value;

            // 2. Extras
            outExtrasList.innerHTML = '';
            let hasExtras = false;
            
            extraInputs.forEach(input => {
                if(input.checked) {
                    hasExtras = true;
                    const price = parseFloat(input.dataset.price);
                    total += price;
                    
                    // Add to visual list
                    const div = document.createElement('div');
                    div.className = "flex justify-between";
                    div.innerHTML = `<span>+ ${input.parentElement.querySelector('span').textContent}</span> <span>$${price.toFixed(2)}</span>`;
                    outExtrasList.appendChild(div);
                }
            });

            outExtrasList.classList.toggle('hidden', !hasExtras);
            outTotal.textContent = `$${total.toFixed(2)}`;
        }

        // Add Listeners
        form.addEventListener('change', updateCalculator);

        // --- WHATSAPP GENERATOR ---
        document.getElementById('whatsapp-btn').addEventListener('click', () => {
            const size = document.querySelector('input[name="size"]:checked').value;
            const color = colorInput.value;
            const extras = Array.from(extraInputs)
                .filter(i => i.checked)
                .map(i => i.parentElement.querySelector('span').textContent)
                .join(', ');
            const total = outTotal.textContent;

            const text = `Hola Everbloom Sameth! 🌹\nMe gustaría pedir un Ramo de ${size} rosas.\nColor: ${color}\nExtras: ${extras || 'Ninguno'}\nTotal Estimado: ${total}\n\n¿Podrían confirmarme disponibilidad?`;
            
            const url = `https://wa.me/51951774812?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');
        });

        // Initialize Calculator
        updateCalculator();