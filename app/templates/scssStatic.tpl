/* Place SCSS for horizontal banners here */
@import "../modules/all";
@import "../vendor/normalize";
@import "../orientation/<%orientation%>";

/* Alter variables for one specific banner by redefining them here */


@import "../partials/all";

#main-panel.<%banner-title%> {
  position: absolute;
  top: 0px;
  left: 0px;
  width: <%collapsedWidth%>px;
  height: <%collapsedHeight%>px;

  /* Declare banner specific styles here */

}