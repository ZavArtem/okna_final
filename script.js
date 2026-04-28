  // Базовая цена за кв.м для разных типов окон
        const basePrices = {
            standard: 4500,
            balcony: 5200,
            cottage: 6800,
            door: 7500
        };

        // Наценки на профиль
        const profileMultipliers = {
            economy: 1.0,
            standard: 1.3,
            premium: 1.7
        };

        // Наценки на стеклопакет
        const glassMultipliers = {
            single: 0.9,
            double: 1.0,
            energy: 1.4,
            triple: 1.6
        };

        function calculatePrice() {
            // Получаем значения из формы
            const windowType = document.getElementById('windowType').value;
            const width = parseFloat(document.getElementById('width').value) / 100; // переводим в метры
            const height = parseFloat(document.getElementById('height').value) / 100; // переводим в метры
            const profile = document.getElementById('profile').value;
            const glass = document.getElementById('glass').value;
            
            // Проверяем доп. опции
            const montage = document.getElementById('montage').checked;
            const slopes = document.getElementById('slopes').checked;
            const sill = document.getElementById('sill').checked;
            const mosquito = document.getElementById('mosquito').checked;

            // Рассчитываем площадь
            const area = width * height;
            
            // Базовая стоимость конструкции
            let baseCost = area * basePrices[windowType];
            
            // Применяем коэффициенты
            const profileCost = baseCost * (profileMultipliers[profile] - 1);
            const glassCost = baseCost * (glassMultipliers[glass] - 1);
            
            // Итоговая базовая стоимость
            let totalCost = baseCost * profileMultipliers[profile] * glassMultipliers[glass];
            
            // Рассчитываем доп. услуги
            let montageCost = 0;
            let slopesCost = 0;
            let sillCost = 0;
            let mosquitoCost = 0;

            if (montage) {
                montageCost = totalCost * 0.15;
                totalCost += montageCost;
            }
            
            if (slopes) {
                slopesCost = totalCost * 0.08;
                totalCost += slopesCost;
            }
            
            if (sill) {
                sillCost = totalCost * 0.12;
                totalCost += sillCost;
            }
            
            if (mosquito) {
                mosquitoCost = totalCost * 0.05;
                totalCost += mosquitoCost;
            }

            // Округляем до тысяч
            totalCost = Math.round(totalCost / 1000) * 1000;
            baseCost = Math.round(baseCost / 1000) * 1000;
            montageCost = Math.round(montageCost / 100) * 100;
            slopesCost = Math.round(slopesCost / 100) * 100;
            sillCost = Math.round(sillCost / 100) * 100;
            mosquitoCost = Math.round(mosquitoCost / 100) * 100;

            // Обновляем интерфейс
            updateDisplay(
                totalCost, 
                baseCost, 
                profileCost, 
                glassCost,
                montage, montageCost,
                slopes, slopesCost,
                sill, sillCost,
                mosquito, mosquitoCost
            );
        }

        function updateDisplay(
            total, base, profile, glass,
            montage, montageCost,
            slopes, slopesCost,
            sill, sillCost,
            mosquito, mosquitoCost
        ) {
            // Обновляем основные цены
            document.getElementById('totalPrice').textContent = formatPrice(total);
            document.getElementById('basePrice').textContent = formatPrice(base);
            document.getElementById('profilePrice').textContent = formatPrice(profile);
            document.getElementById('glassPrice').textContent = formatPrice(glass);
            document.getElementById('finalPrice').textContent = formatPrice(total);

            // Обновляем доп. опции
            toggleOption('montageItem', 'montagePrice', montage, montageCost);
            toggleOption('slopesItem', 'slopesPrice', slopes, slopesCost);
            toggleOption('sillItem', 'sillPrice', sill, sillCost);
            toggleOption('mosquitoItem', 'mosquitoPrice', mosquito, mosquitoCost);
        }

        function toggleOption(itemId, priceId, isVisible, cost) {
            const item = document.getElementById(itemId);
            const price = document.getElementById(priceId);
            
            if (isVisible && cost > 0) {
                item.style.display = 'flex';
                price.textContent = formatPrice(cost);
            } else {
                item.style.display = 'none';
            }
        }

        function formatPrice(price) {
            return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
        }

        function showContactForm() {
            alert('Спасибо за интерес! Для заказа бесплатного замера позвоните по номеру +7 (917) 942-79-39 или оставьте заявку на сайте.');
        }

        // Авторасчет при загрузке страницы
        document.addEventListener('DOMContentLoaded', function() {
            calculatePrice();
        });

        // Авторасчет при изменении любых параметров
        document.querySelectorAll('#calculator input, #calculator select').forEach(element => {
            element.addEventListener('change', calculatePrice);
            element.addEventListener('input', calculatePrice);
        });
