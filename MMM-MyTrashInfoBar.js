Module.register("MMM-MyTrashInfoBar", {
	// Module config defaults.
	defaults: {
		updateInterval: 10 * 60 * 1000
	},
	getStyles: function () {
		return ["font-awesome.css"];
	},
	// Define required scripts.
	getScripts: function () {
		return ["moment.js"];
	},

	// Define start sequence.
	start: function () {
		Log.info("Starting module: " + this.name);

		var self = this;

		// Schedule update timer.
		setInterval(function () {
			self.updateDom(0);
		}, this.config.updateInterval);
	},

	trashTypeText: function () {
		var now = moment();
		var ref = moment('2020-03-01');
		var dayDiff = now.diff(ref, 'days');
		if (dayDiff % 14 === 0) {
      return 'ビン・カン'
    } else if (dayDiff % 14 === 3) {
      return 'プラ・衣類・布類・枝葉'
    } else if (dayDiff % 14 === 7) {
      return 'ダンボール'
    } else if (dayDiff % 14 === 9) {
      return 'ペットボトル'
    } else if (dayDiff % 14 === 10) {
      return 'プラ・新聞紙・牛乳パック'
    } else if (dayDiff % 7 === 1 || dayDiff % 14 === 11) {
      return '可燃・おむつ'
    } else if (dayDiff % 14 === 4) {
      return '可燃・不燃・おむつ'
    } else if (dayDiff % 28 === 2) {
      return '本・雑誌・その他の紙'
    } else if (dayDiff % 28 === 16) {
      return '本・雑誌・その他の紙・有害'
    } else {
      return 'なし'
    }
	},

	// Override dom generator.
	getDom: function () {
		var wrapper = document.createElement("div");
		wrapper.className = this.config.classes ? this.config.classes : "thin medium bright";
		// get the info text
		var trashInfoText = this.trashTypeText();
		const symbol = document.createElement("span");
		symbol.className = "fa fa-fw fa-trash";
		symbol.style.marginRight = "5px";
		wrapper.appendChild(symbol);
		wrapper.appendChild(document.createTextNode(trashInfoText))

		return wrapper;
	},
});