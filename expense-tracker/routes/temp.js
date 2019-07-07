switch (req._parsedOriginalUrl.query) {
  case 'Jan':
    Record.find({ userID: req.user._id, date: new RegExp(a) }, (err, records) => {
      display(res, err, records)
    }).sort({ date: -1 })
    break
  case 'Feb':
    Record.find({ userID: req.user._id, "date": { $regex: /^\d{4}-02-*/ } }, (err, records) => {
      display(res, err, records)
    }).sort({ date: -1 })
    break
  case 'Mar':
    Record.find({ userID: req.user._id, "date": { $regex: /^\d{4}-03-*/ } }, (err, records) => {
      display(res, err, records)
    }).sort({ date: -1 })
    break
  case 'Apr':
    Record.find({ userID: req.user._id, "date": { $regex: /^\d{4}-04-*/ } }, (err, records) => {
      display(res, err, records)
    }).sort({ date: -1 })
    break
  case 'May':
    Record.find({ userID: req.user._id, "date": { $regex: /^\d{4}-05-*/ } }, (err, records) => {
      display(res, err, records)
    }).sort({ date: -1 })
    break
  case 'Jun':
    Record.find({ userID: req.user._id, "date": { $regex: /^\d{4}-06-*/ } }, (err, records) => {
      display(res, err, records)
    }).sort({ date: -1 })
    break
  case 'Jul':
    Record.find({ userID: req.user._id, "date": { $regex: /^\d{4}-07-*/ } }, (err, records) => {
      display(res, err, records)
    }).sort({ date: -1 })
    break
  case 'Aug':
    Record.find({ userID: req.user._id, "date": { $regex: /^\d{4}-08-*/ } }, (err, records) => {
      display(res, err, records)
    }).sort({ date: -1 })
    break
  case 'Sep':
    Record.find({ userID: req.user._id, "date": { $regex: /^\d{4}-09-*/ } }, (err, records) => {
      display(res, err, records)
    }).sort({ date: -1 })
    break
  case 'Oct':
    Record.find({ userID: req.user._id, "date": { $regex: /^\d{4}-10-*/ } }, (err, records) => {
      display(res, err, records)
    }).sort({ date: -1 })
    break
  case 'Nov':
    Record.find({ userID: req.user._id, "date": { $regex: /^\d{4}-11-*/ } }, (err, records) => {
      display(res, err, records)
    }).sort({ date: -1 })
    break
  case 'Dec':
    Record.find({ userID: req.user._id, "date": { $regex: /^\d{4}-12-*/ } }, (err, records) => {
      display(res, err, records)
    }).sort({ date: -1 })
    break
  case 'home':
    Record.find({ userID: req.user._id, "category": "家居物業" }, (err, records) => {
      display(res, err, records)
    }).sort({ date: -1 })
    break
  case 'transport':
    Record.find({ userID: req.user._id, "category": "交通出行" }, (err, records) => {
      display(res, err, records)
    }).sort({ date: -1 })
    break
  case 'entertain':
    Record.find({ userID: req.user._id, "category": "休閒娛樂" }, (err, records) => {
      display(res, err, records)
    }).sort({ date: -1 })
    break
  case 'food':
    Record.find({ userID: req.user._id, "category": "餐飲食品" }, (err, records) => {
      display(res, err, records)
    }).sort({ date: -1 })
    break
  case 'other':
    Record.find({ userID: req.user._id, "category": "其他" }, (err, records) => {
      display(res, err, records)
    }).sort({ date: -1 })
    break
}

, date: new RegExp(search)