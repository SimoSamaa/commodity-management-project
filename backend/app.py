from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

app.app_context().push()

dir_path = os.path.abspath(os.path.dirname(__file__))

app.config['SECRET_KEY'] = 'my_key'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
    os.path.join(dir_path, 'products.sqlite')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config.from_object(__name__)

CORS(app, resources={r"/*": {'origins': "*"}})

db = SQLAlchemy(app)


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    price = db.Column(db.String)
    taxes = db.Column(db.String)
    ads = db.Column(db.String)
    discount = db.Column(db.String)
    total = db.Column(db.String)
    category = db.Column(db.String)
    date = db.Column(db.String)

    def __init__(self, title, price, taxes, ads, discount, total, category, date) -> None:
        self.title = title
        self.price = price
        self.taxes = taxes
        self.ads = ads
        self.discount = discount
        self.total = total
        self.category = category
        self.date = date


def create_db_products():
    db.create_all()


@app.route('/products-table', methods=['POST'])
def add_products():

    prod_obj = {"status": "success"}

    if request.method == 'POST':

        post_data = request.get_json()

        new_product = Product(
            post_data.get('title'),
            post_data.get('price'),
            post_data.get('taxes'),
            post_data.get('ads'),
            post_data.get('discount'),
            post_data.get('total'),
            post_data.get('category'),
            post_data.get('date'),
        )

        db.session.add(new_product)
        db.session.commit()

        prod_obj['message'] = 'Product Added!'

    return jsonify(prod_obj)


@app.route('/products-table', methods=['GET'])
def get_products():
    create_db_products()

    res_obj = {'status': 'success'}
    products = Product.query.all()

    product_list = []
    for prod in products:

        product_data = {
            'id': prod.id,
            'title': prod.title,
            'price': prod.price,
            'taxes': prod.taxes,
            'ads': prod.ads,
            'discount': prod.discount,
            'total': prod.total,
            'category': prod.category,
            'date': prod.date
        }

        product_list.append(product_data)

    res_obj['products'] = product_list
    return jsonify(res_obj)


@app.route('/products-table/<prod_id>', methods=['DELETE'])
def delete_product(prod_id):
    res_obj = {'status': 'success'}
    prod_to_delete = Product.query.get(prod_id)

    if request.method == 'DELETE':
        db.session.delete(prod_to_delete)
        db.session.commit()
        res_obj['message'] = 'product Removed!'

    return jsonify(res_obj)


@app.route('/products-table/<prod_id>', methods=['PUT'])
def update_product(prod_id):
    res_obj = {'status': 'success'}
    prod_to_update = Product.query.get(prod_id)

    if request.method == 'PUT':
        post_data = request.get_json()
        prod_to_update.title = post_data.get('title')
        prod_to_update.price = post_data.get('price')
        prod_to_update.taxes = post_data.get('taxes')
        prod_to_update.ads = post_data.get('ads')
        prod_to_update.discount = post_data.get('discount')
        prod_to_update.total = post_data.get('total')
        db.session.commit()
        res_obj['message'] = 'product Updated!'

    return jsonify(res_obj)


@app.route('/products-table/products', methods=['DELETE'])
def delete_all_products():
    res_obj = {'status': 'success'}

    db.session.query(Product).delete()
    db.session.commit()
    res_obj['message'] = 'All Products Removed!'

    return jsonify(res_obj)


if __name__ == '__main__':
    app.run(port=3000, debug=True)
