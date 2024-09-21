document.addEventListener('DOMContentLoaded', function() {
            const channelItems = document.querySelectorAll('.channel-item');

            channelItems.forEach(channelItem => {
                const streamUrl = channelItem.querySelector('.watch-now-btn').getAttribute('data-stream');
                const liveStatusElement = channelItem.querySelector('.live-status');

                checkStreamStatus(streamUrl, liveStatusElement);
            });
        });

        async function checkStreamStatus(streamUrl, liveStatusElement) {
            try {
                const response = await fetch(streamUrl, { method: 'HEAD' });
                if (response.ok) {
                    liveStatusElement.textContent = 'Live';
                    liveStatusElement.classList.add('live');
                } else {
                    liveStatusElement.textContent = 'Offline';
                    liveStatusElement.classList.add('offline');
                }
            } catch (error) {
                liveStatusElement.textContent = 'Offline';
                liveStatusElement.classList.add('offline');
            }
        }
