if (window.applicationCache) {
    applicationCache.addEventListener('updateready', function() {
        if (confirm('An update is available. Reload now?')) {
            window.location.reload();
        }
    });
}

if (window.navigator.mozApps) {
	window.navigator.mozApps.install('http://orbium.dev/manifest.webapp');
}