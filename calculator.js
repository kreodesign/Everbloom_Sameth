function updateCalculator() {
            let total = 0;
            let messageBase = "";

            // 1. Get Base Size Price
            const selectedSize = document.querySelector('input[name="size"]:checked');
            const basePrice = parseFloat([20, 35, 55, 120][Array.from(sizeInputs).indexOf(selectedSize)]); // Mapping values to prices if needed, or use logic below
            
            // Logic based on value in HTML (simple mapping for this demo)
            let currentBasePrice = 0;
            if(selectedSize.value === '6') currentBasePrice = 20;
            if(selectedSize.value === '12') currentBasePrice = 35;
            if(selectedSize.value === '24') currentBasePrice = 55;
            if(selectedSize.value === '50') currentBasePrice = 120;

            total += currentBasePrice;

            // Update UI Summary
            outSize.textContent = `Ramo de ${selectedSize.value} Rosas`;
            outSizePrice.textContent = `S/${currentBasePrice.toFixed(2)}`;
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
                    div.innerHTML = `<span>+ ${input.parentElement.querySelector('span').textContent}</span> <span>S/${price.toFixed(2)}</span>`;
                    outExtrasList.appendChild(div);
                }
            });

            outExtrasList.classList.toggle('hidden', !hasExtras);
            outTotal.textContent = `S/${total.toFixed(2)}`;
        }

        // Add Listeners
        form.addEventListener('change', updateCalculator);
        
        // --- WHATSAPP GENERATOR CON EFECTO ---
        document.getElementById('whatsapp-btn').addEventListener('click', () => {
            // 1. Lanzar efecto de confeti
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#d946ef', '#f472b6', '#ffffff'] // Colores de Everbloom
            });

            // 2. Obtener datos para el mensaje
            const size = document.querySelector('input[name="size"]:checked').value;
            const color = colorInput.value;
            const extras = Array.from(extraInputs)
                .filter(i => i.checked)
                .map(i => i.parentElement.querySelector('span').textContent)
                .join(', ');
            const total = outTotal.textContent;

            const text = `¡Hola Everbloom Sameth! 🌹\nAcabo de personalizar mi ramo ideal:\n\n- Tamaño: ${size} rosas\n- Color: ${color}\n- Extras: ${extras || 'Ninguno'}\n- Total Estimado: ${total}\n\n¿Podrían confirmarme disponibilidad para mi pedido?`;
            
            const url = `https://wa.me/51951774812?text=${encodeURIComponent(text)}`;
            
            // 3. Pequeña demora para que el usuario vea el confeti antes de salir
            setTimeout(() => {
                window.open(url, '_blank');
            }, 800);
        });

        // Initialize Calculator
        updateCalculator();