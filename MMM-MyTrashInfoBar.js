Module.register("MMM-MyTrashInfoBar", {
	// Module config defaults.
	defaults: {
		updateInterval: 10 * 60 * 1000
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

	trashTypeFromDays: function (dayDiff) {
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
      return null
    }
	},

	tomorrowTrashInfo: function () {
		var now = moment();
		var ref = moment('2020-03-01');
		var dayDiff = now.diff(ref, 'days');
		var trashType = this.trashTypeFromDays(dayDiff);
		return trashType ? '明日は' + trashType + 'ゴミ収集日' : '明日はゴミ収集はありません'
	},

	// Override dom generator.
	getDom: function () {
		var wrapper = document.createElement("div");
		wrapper.className = this.config.classes ? this.config.classes : "thin xlarge bright pre-line";
		// get the info text
		var complimentText = this.tomorrowTrashInfo();
		wrapper.appendChild(complimentText)

		return wrapper;
	},
});