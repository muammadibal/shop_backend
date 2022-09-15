const Product = require("../models/Product");
const ProductImage = require("../models/ProductImage");
const ProductCategory = require("../models/ProductCategory");
const fs = require("fs");
const path = require("path");

module.exports = {
  getAllProduct: async (req, res, next) => {
    const product = await Product.find().populate("productCategoryId");
    res.json({
      message: "get all product success",
      data: product,
    });
  },
  getProduct: async (req, res, next) => {
    const { id } = req.body;
    const product = await Product.findOne({ _id: id }).populate(
      "productCategoryId"
    );
    if (product) {
      res.json({
        message: "get product success",
        data: product,
      });
    } else {
      res.json({
        message: "get product failed, not found",
        data: null,
      });
    }
  },
  createProduct: async (req, res, next) => {
    const {
      userId,
      title,
      images,
      description,
      price,
      thumbnail,
      discountPrice,
      productCategoryId,
    } = req.body;
    try {
      const product = new Product();

      product.userId = userId;
      product.title = title;
      product.description = description;
      product.price = price;
      product.discountAmount = discountPrice;
      product.productCategoryId = productCategoryId;

      if (thumbnail) {
        let base64Img = thumbnail.split(";base64,")[1];
        let fileName = `${
          Date.now() + "-" + Math.round(Math.random() * 1e9)
        }-thumbnail.jpg`;

        product.thumbnail = fileName;

        let pathImg =
          path.join(__dirname, "./../public/images/products/") + fileName;

        fs.writeFileSync(
          pathImg,
          base64Img,
          { encoding: "base64" },
          function (err) {
            console.log("File created");
          }
        );
      }

      await product.save();

      if (Array.isArray(images) && images?.length > 0) {
        await Promise.all(
          images?.map(async (img) => {
            let base64Img = img.split(";base64,")[1];
            let fileName = `${
              Date.now() + "-" + Math.round(Math.random() * 1e9)
            }.jpg`;

            let pathImg =
              path.join(__dirname, "./../public/images/products/") + fileName;

            fs.writeFileSync(
              pathImg,
              base64Img,
              { encoding: "base64" },
              function (err) {
                console.log("File created");
              }
            );

            await ProductImage.create({
              imageUrl: fileName,
              productId: product._id,
            });
          })
        );
      }

      let productItem = await ProductImage.find({
        productId: product._id.toString(),
      });

      let dataItem = {
        _id: product.id,
        userId: product.userId,
        title: product.title,
        description: product.description,
        price: product.price,
        isActive: product.isActive,
        thumbnail: product.thumbnail,
        images: productItem.map((i) => i.imageUrl),
      };

      res.json({
        message: "create product success",
        data: dataItem,
      });
    } catch (error) {
      res.json({
        message: error?.message,
      });
    }
  },
  updateProduct: async (req, res, next) => {
    const {
      id,
      title,
      images,
      description,
      price,
      thumbnail,
      isActive,
      discountPrice,
      productCategoryId,
    } = req.body;
    try {
      const productImage = await ProductImage.find({ productId: id });
      const product = await Product.findOne({ _id: id });

      if (product) {
        if (productCategoryId) {
          const productCategory = await ProductCategory.findOne({
            _id: productCategoryId,
          });

          if (productCategory) {
            product.productCategoryId =
              productCategoryId || product.productCategoryId;
          } else {
            throw new Error("product category not exists");
          }
        }

        product.title = title || product.title;
        product.description = description || product.description;
        product.price = price || product.price;
        product.isActive = isActive || product.isActive;
        product.discountAmount = discountPrice || product.discountAmount;

        if (thumbnail) {
          let pathImgDefault =
            path.join(__dirname, "./../public/images/products/") +
            product.thumbnail;
          fs.unlinkSync(pathImgDefault);

          let base64Img = thumbnail.split(";base64,")[1];
          let fileName = `${
            Date.now() + "-" + Math.round(Math.random() * 1e9)
          }-thumbnail.jpg`;

          product.thumbnail = fileName;

          let pathImg =
            path.join(__dirname, "./../public/images/products/") + fileName;

          fs.writeFileSync(
            pathImg,
            base64Img,
            { encoding: "base64" },
            function (err) {
              console.log("File created");
            }
          );
        }

        product.save();

        if (Array.isArray(images) && images?.length > 0) {
          productImage.map(async (item) => {
            let pathImg =
              path.join(__dirname, "./../public/images/products/") +
              item.imageUrl;
            fs.unlinkSync(pathImg);
            await ProductImage.deleteMany({ productId: id });
          });

          await Promise.all(
            images?.map(async (img) => {
              let base64Img = img.split(";base64,")[1];
              let fileName = `${
                Date.now() + "-" + Math.round(Math.random() * 1e9)
              }.jpg`;
              let pathImg =
                path.join(__dirname, "./../public/images/products/") + fileName;

              fs.writeFileSync(
                pathImg,
                base64Img,
                { encoding: "base64" },
                function (err) {
                  console.log("File created");
                }
              );

              await ProductImage.create({
                imageUrl: fileName,
                productId: id,
              });
            })
          );
        }

        let productItem = await ProductImage.find({
          productId: product._id.toString(),
        });

        let dataItem = {
          _id: product.id,
          userId: product.userId,
          title: product.title,
          description: product.description,
          productCategoryId: product.productCategoryId,
          price: product.price,
          thumbnail: product.thumbnail,
          isActive: product.isActive,
          images: productItem.map((i) => i.imageUrl),
        };

        res.json({
          message: "update product success",
          data: dataItem,
        });
      } else {
        res.json({
          message: "product not exists",
          data: null,
        });
      }
    } catch (error) {
      res.json({
        message: error?.message,
      });
    }
  },
  deleteProduct: async (req, res, next) => {
    const { id } = req.body;
    try {
      const productImage = await ProductImage.find({ productId: id });
      const product = await Product.findOne({ _id: id });

      let pathImgDefault =
        path.join(__dirname, "./../public/images/products/") +
        product.thumbnail;
      fs.unlinkSync(pathImgDefault);

      productImage.map(async (item) => {
        let pathImg =
          path.join(__dirname, "./../public/images/products/") + item.imageUrl;
        fs.unlinkSync(pathImg);
        await ProductImage.deleteMany({ productId: id });
      });

      product.delete();
      res.json({
        message: "delete product success",
        data: null,
      });
    } catch (error) {
      res.json({
        message: error?.message,
        data: null,
      });
    }
  },
};
