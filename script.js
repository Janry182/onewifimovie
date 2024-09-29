const videoPopup = document.getElementById('video-popup');
    const video = document.getElementById('video');
    const closeButton = document.getElementById('close-btn');
	const fullscreenButton = document.getElementById('fullscreen-btn');
    const bitrateSelector = document.getElementById('bitrate-selector');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeMinus = document.getElementById('volume-minus');
    const volumePlus = document.getElementById('volume-plus');
    const tvChannelsLink = document.getElementById('tv-channels-link');
    const movieChannelsLink = document.getElementById('movie-channels-link');
    const channelListTv = document.getElementById('channel-list-tv');
    const channelListMovies = document.getElementById('channel-list-movies');
	const filterButtons = document.querySelectorAll('.filter-btn');
    const watchNowButtons = document.querySelectorAll('.watch-now-btn');
    let hls;

    tvChannelsLink.addEventListener('click', function(event) {
        event.preventDefault();
        tvChannelsLink.classList.add('active');
        movieChannelsLink.classList.remove('active');
        channelListTv.style.display = 'grid';
        channelListMovies.style.display = 'none';
    });

    movieChannelsLink.addEventListener('click', function(event) {
        event.preventDefault();
        movieChannelsLink.classList.add('active');
        tvChannelsLink.classList.remove('active');
        channelListTv.style.display = 'none';
        channelListMovies.style.display = 'grid';
    });
	
	// Filter buttons functionality
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    filterChannels(filter);
                });
            });

            function filterChannels(filter) {
                const channelItems = document.querySelectorAll('.channel-item');
                channelItems.forEach(item => {
                    const statusElement = item.querySelector('.live-status') || item.querySelector('.alternate');
                    const status = item.getAttribute('data-status') || (statusElement ? statusElement.textContent.toLowerCase() : '');
                    if (filter === 'all' || status === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }

    watchNowButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const streamUrl = this.getAttribute('data-stream');
            const href = this.getAttribute('data-href');

            if (href) {
                window.location.href = href;
            } else if (streamUrl) {
                if (Hls.isSupported()) {
                    if (hls) {
                        hls.destroy();
                    }
                    hls = new Hls();
                    hls.loadSource(streamUrl);
                    hls.attachMedia(video);
                    hls.on(Hls.Events.MANIFEST_PARSED, function () {
                        video.play();
                    });
                    hls.on(Hls.Events.LEVEL_LOADED, function (event, data) {
                        populateBitrateSelector(data.levels);
                    });
                } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                    video.src = streamUrl;
                    video.addEventListener('loadedmetadata', function () {
                        video.play();
                    });
                }
		
		
		else {
                    alert('Your browser does not support HLS streaming.');
                }

                videoPopup.style.display = 'flex';
            }
        });
    });

    closeButton.addEventListener('click', function() {
        videoPopup.style.display = 'none';
        video.pause();
        video.src = '';
        if (hls) {
            hls.destroy();
        }
    });

    videoPopup.addEventListener('click', function(event) {
        if (event.target === videoPopup) {
            closeButton.click();
        }
    });

    volumeMinus.addEventListener('click', function() {
        volumeSlider.value = Math.max(0, volumeSlider.value - 5); // Decrease volume by 5
        video.volume = volumeSlider.value / 100; // Update video volume
    });

    volumePlus.addEventListener('click', function() {
        volumeSlider.value = Math.min(100, volumeSlider.value + 5); // Increase volume by 5
        video.volume = volumeSlider.value / 100; // Update video volume
    });

    volumeSlider.addEventListener('input', function() {
        const volume = this.value / 100; // Convert to a value between 0 and 1
        video.volume = volume; // Set the video volume
    });

    function populateBitrateSelector(levels) {
        bitrateSelector.innerHTML = '<option value="auto">Auto</option>';

        levels.forEach((level, index) => {
            const bitrate = level.bitrate / 1000;
            bitrateSelector.innerHTML += `<option value="${index}">Quality ${index + 1}: ${bitrate} kbps</option>`;
        });

        bitrateSelector.addEventListener('change', function() {
            const selectedIndex = this.value;
            if (selectedIndex === 'auto') {
                hls.currentLevel = -1;
            } else {
                hls.currentLevel = parseInt(selectedIndex, 10);
            }
        });
    }

    // Initialize to show TV channels by default
    tvChannelsLink.click();
