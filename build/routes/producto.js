"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//LLAMAR A LOS MODELOS CREADOS
const producto_1 = __importDefault(require("../models/producto"));
const categoria_1 = __importDefault(require("../models/categoria"));
class Producto {
    constructor() {
        this.router = express_1.Router();
        this.exponerRutas();
    }
    async getProducto(req, res) {
        try {
            let productoBD = await producto_1.default.find({});
            categoria_1.default.populate(productoBD, { path: "categoria", select: 'nombre' });
            let conteo = await producto_1.default.countDocuments();
            res.json({
                productos: productoBD,
                conteo: conteo
            });
        }
        catch (error) {
            return res.status(400).json({
                dato: error
            });
        }
    }
    async getProductoId(req, res) {
        try {
            let idurl = req.params.id; //56
            let productoBD = await producto_1.default.findById(idurl);
            res.json({
                ok: true,
                producto: productoBD
            });
        }
        catch (error) {
            return res.status(400).json({
                ok: false,
                dato: "Producto no encontrado",
                message: error
            });
        }
    }
    async postProducto(req, res) {
        try {
            let bodycabecera = req.body;
            console.log(req.body);
            let producto = new producto_1.default({
                nombre: bodycabecera.nombre,
                precioUni: bodycabecera.precioUni,
                descripcion: bodycabecera.descripcion,
                categoria: bodycabecera.categoria,
            });
            let productoBD = await producto.save();
            res.json({
                producto: productoBD
            });
        }
        catch (error) {
            return res.status(500).json({
                dato: error
            });
        }
    }
    async putProducto(req, res) {
        try {
            let idurl = req.params.id;
            let bodycabecera = req.body;
            let productoBD = await producto_1.default.findByIdAndUpdate(idurl, bodycabecera, { new: true, runValidators: true, context: 'query' });
            res.json({
                producto: productoBD
            });
        }
        catch (error) {
            return res.status(400).json({
                ok: "ERROR",
                dato: error
            });
        }
    }
    async deleteProducto(req, res) {
        try {
            let idurl = req.params.id;
            let productoBD = await producto_1.default.findByIdAndRemove(idurl);
            res.json({
                mensaje: "PRODUCTO ELIMINADO",
                producto: productoBD
            });
        }
        catch (error) {
            return res.status(400).json({
                message: "PRODUCTO NO ENCONTRADO",
                dato: error
            });
        }
    }
    exponerRutas() {
        this.router.get('/', this.getProducto);
        this.router.get('/:id', this.getProductoId);
        this.router.post('/', this.postProducto);
        this.router.put('/:id', this.putProducto);
        this.router.delete('/:id', this.deleteProducto);
    }
}
const producto = new Producto();
exports.default = producto.router;
