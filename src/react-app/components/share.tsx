<div className="btn-multi">
<input type="checkbox" id="multi-btn" name="multi-btn" />
<label htmlFor="multi-btn">
  {/* Facebook Share */}
  <a
    href="https://www.facebook.com/sharer/sharer.php?u=https://yourwebsite.com"
    className="btn btn-circle"
    target="_blank"
  >
    <i className="fab fa-facebook-f icon" aria-hidden="true"></i>
  </a>

  {/* Twitter Share */}
  <a
    href="https://twitter.com/intent/tweet?url=https://yourwebsite.com&text=Check%20this%20out!"
    className="btn btn-circle"
    target="_blank"
  >
    <i className="fab fa-twitter icon" aria-hidden="true"></i>
  </a>

  {/* YouTube Link */}
  <a
    href="https://www.google.com/"
    className="btn btn-circle"
    target="_blank"
  >
    <i className="fab fa-youtube icon" aria-hidden="true"></i>
  </a>

  <span className="btn btn-circle">
    <i className="material-icons icon">close</i>
  </span>
  <i className="material-icons icon">share</i>
</label>
</div>