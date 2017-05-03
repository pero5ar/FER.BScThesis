import React, {Component} from 'react';
import {Row, Clearfix} from 'react-bootstrap/lib';
import ItemThumbnail from './ItemThumbnail';

class ItemThumbnailContainer extends Component {
    render() {
        return (
            <Row>
                <ItemThumbnail id="1" image="https://upload.wikimedia.org/wikipedia/commons/a/af/Tolstoy_-_War_and_Peace_-_first_edition%2C_1869.jpg" title="Rat i Mir" description="rusko izdanje" />
                <ItemThumbnail id="2" image="http://skolskaknjiga.i-mall.hr/images/artikli/10/102712/velika.jpg" title="Čudnovate zgode šegrta Hlapića" description="lektira, školska knjiga" />
                <ItemThumbnail id="3" image="https://images-na.ssl-images-amazon.com/images/I/41aQPTCmeVL._SX331_BO1,204,203,200_.jpg" title="Hobbit" description="englesko izdanje" />
                <ItemThumbnail id="4" image="http://www.njuskalo.hr/image-bigger/djecje-knjige/don-quijote-posljednji-mohikanac-dekameron-5-knjiga-slika-16572282.jpg" title="Dekameron" description="u dva dijela, meke korice" />
                <Clearfix visible-xs-block></Clearfix>
                <ItemThumbnail id="5" image="http://www.njuskalo.hr/image-w920x690/stripovi/alan-ford-superstrip-kolekcija-1-448-2-nikad-objavljena-izdanja-slika-34442818.jpg" title="Alan Ford" description="POSUĐUJEM NAJVIŠE 3 PO OSOBI!!!" />
                <ItemThumbnail id="6" image="http://www.algoritam-mk.hr/img/product/11t_2015/pjesma-leda-i-vatre-3-oluja-maceva-2_vi_rgb-1000.jpg" title="Pjesma leda i vatre - Oluja mačeva (drugi dio)" description="Treća knjiga fantastičnog serijala George R.R. Martina koj..." />
                <ItemThumbnail id="7" image="https://upload.wikimedia.org/wikipedia/bs/8/89/Kome_zvono_zvoni.jpg" title="KOME ZVONO ZVONI" description="" />
                <ItemThumbnail id="8" image="http://www.pivnica.net/ieNews/slike/n_1444.jpg" title="kiklop" description="ranko marinković" />
            </Row>
        );
    }
}

export default ItemThumbnailContainer;