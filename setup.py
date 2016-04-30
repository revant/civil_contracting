from setuptools import setup, find_packages
import os

version = '1.2.0'

setup(
    name='civil_contracting',
    version=version,
    description='App for Civil Contracting Enterprises',
    author='Revant Nandgaonkar',
    author_email='revant.one@gmail.com',
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=("frappe",),
)
