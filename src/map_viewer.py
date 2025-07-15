# Responsible for rendering 2D map and capturing bounding box selection

# map_viewer.py
import leafmap
from ipyleaflet import DrawControl

class MapViewer:
    def __init__(self):
        self.map = leafmap.Map(center=[26.1445, 91.7362], zoom=12)
        self.draw_control = DrawControl(rectangle={'shapeOptions': {'color': '#0000FF'}})
        self.bbox = None
        self._setup_draw()

    def _setup_draw(self):
        def handle_draw(_, action, geo_json):
            coords = geo_json['geometry']['coordinates'][0]
            lats = [c[1] for c in coords]
            lons = [c[0] for c in coords]
            self.bbox = (min(lats), max(lats), min(lons), max(lons))


        self.draw_control.on_draw(handle_draw)
        self.map.add_control(self.draw_control)

    def show(self):
        return self.map

    def get_bbox(self):
        return self.bbox