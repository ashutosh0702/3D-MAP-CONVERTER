# Responsible for rendering the 3D scene

# renderer.py
import pyvista as pv
import rasterio
import numpy as np

class Renderer:
    def __init__(self, dem_path, gdf):
        self.dem_path = dem_path
        self.gdf = gdf

    def render(self):
        with rasterio.open(self.dem_path) as src:
            elevation = src.read(1)
            transform = src.transform
            nrows, ncols = elevation.shape

        x = np.arange(ncols)
        y = np.arange(nrows)
        xx, yy = np.meshgrid(x, y)
        zz = elevation

        grid = pv.StructuredGrid()
        grid.points = np.c_[xx.ravel(), yy.ravel(), zz.ravel()]
        grid.dimensions = (ncols, nrows, 1)

        plotter = pv.Plotter()
        plotter.add_mesh(grid, cmap="terrain", opacity=0.8)

        for _, row in self.gdf.iterrows():
            if 'height' in row and row.geometry.geom_type == 'Polygon':
                height = float(row['height']) if row['height'] else 10.0
                exterior_coords = np.array(row.geometry.exterior.coords)
                polygon = pv.Polygon(exterior_coords)
                extruded = polygon.extrude([0, 0, height])
                plotter.add_mesh(extruded, color='gray')

        plotter.show()

