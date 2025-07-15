# Responsible for fetching OSM and DEM data for the selected bbox

# data_fetcher.py
import osmnx as ox
import elevation
import os
import geopandas as gpd
from shapely.geometry import box

class DataFetcher:
    def __init__(self, bbox):
        self.south, self.north, self.west, self.east = bbox


    def fetch_osm_features(self, tags=None):
        
        print("Fetching OSM features for:", self.south, self.north, self.west, self.east)

        if tags is None:
            tags = {
                'building': True,
                'highway': True,
                'natural': True,
                'landuse': True,
                'waterway': True
            }
        bbox_polygon = box(self.west, self.south, self.east, self.north)
        gdf = ox.features_from_polygon(bbox_polygon, tags=tags)
        return gdf

    
    def fetch_dem(self, output_path='data/dem/clip.tif'):
        print("Fetching DEM features for:", self.south, self.north, self.west, self.east)

        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        if not os.path.exists(output_path):
            elevation.clip(bounds=(self.west, self.south, self.east, self.north), output=output_path)
        return output_path

