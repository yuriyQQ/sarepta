	/*      --------------check -----------------      */
$(function(){	
	Check = {                          //объявление класса и параметров по умолчанию
		flag : true,
		error_class : 'error',
		form : $('form'),
        
		verify : function(th){              //функция проверки
			var object1 = this;             //сохраняем исходный объект			
				var type = th.attr('data-type'),               //записываем переменные inputа
					val = th.val(),
					check_ignore = th.attr('data-ch-i');
                    //console.log(type);
				if(!Check.types[type](th, val, check_ignore)){  //проверка для данного типа
                    th.addClass(this.error_class);                                //есть ошибка, обнуляем флаг                                  
					object1.state(false,th);                    //изменяем состояние (см. далее, визуальное изменение)
                    this.flag = false;
                    //console.log('ch_i');
                    
				}else{
					object1.state(true,th);
                    
				}
		},
        
		types : {                     //описание проверки каждого типа данных
        /*----------- подфункции верификации ----------*/
			nole : function(val){            //проверка на заполненность
				if( val == '' ) 
					return false;              //не важно как называется функция проверки - тру - нет ошибки ; фолс - ошибка
				else
					return true;
			},
            
            ints : function(val){            //проверка на числа
				var reg=/^[0-9]+$/;
                return reg.test(val);                   
            },
            
            chars : function(val){            //проверка на символы
				var reg=/^[A-zА-я ]+$/;
                return reg.test(val);                   
            },
            
            mail : function(val){            //проверка на email
				//console.log("mail");
                var reg=/\w+@[a-zA-Z_]+[a-zA-Z_]{2,6}/;
                return reg.test(val);                   
            },
            
            lenmin : function(val, l){
                if (val.length >= l){ return true;}
                else {return false};
            },
            
            phone_ch : function(val){
                var reg=/^[0-9()+-]+$/;
                return reg.test(val);
            },
            
            up : function(val, obj){            //все слова -> заглавные
            var tArray = val.toLowerCase().split(" ");
            val = ('');
            for (i = 0 ; i < tArray.length ; ++i) //output(tArray[i], i)
                val=val+tArray[i].charAt(0).toUpperCase()+tArray[i].slice(1)+' ';            
            val = val.slice(0, -1);
            obj.val(val);
            //return(val);
			},
            /*----------- подфункции верификации конец----------*/
             
            text : function(obj, val, ch_i){
                var ch_list = {"nole":"1", "lenmin":"2"};                                
                return this.universal(obj, val, ch_i, ch_list);                              
			},
            name : function(obj, val, ch_i){
                var ch_list = {"nole":"1", "chars":"1", "up":"1", "lenmin":"2"};                                
                return this.universal(obj, val, ch_i, ch_list);                                 
			},
            email : function(obj, val, ch_i){
                var ch_list = {"nole":"1", "mail":"1", "lenmin":"2"};                                
                return this.universal(obj, val, ch_i, ch_list);                                
			},
            sum : function(obj, val, ch_i){
                var ch_list = {"nole":"1", "ints":"1", "lenmin":"2"};                                
                return this.universal(obj, val, ch_i, ch_list);                                            
			},
            phone : function(obj, val, ch_i){
                var ch_list = {"nole":"1", "phone_ch":"1","lenmin":"11"};                                
                return this.universal(obj, val, ch_i, ch_list);                                            
			},
            mphone : function(obj, val, ch_i){
                var ch_list = {"nole":"1", "phone_ch":"1", "lenmin":"11"};                                
                return this.universal(obj, val, ch_i, ch_list);                                            
			},
            
            universal : function(obj, val, ch_i, ch_list){
            var flag = true;
            error_text='';

            if(ch_i==1){return flag; 
            }
                else if(ch_i==0){
                if (ch_list['nole']==1){flag=(flag && this.nole(val)); if(!this.nole(val)){error_text='Заполните поле'}};
                if (ch_list['ints']==1){flag=(flag && this.ints(val)); if(!this.ints(val)){error_text='Поле должно содержать только цифры'}};
                if (ch_list['chars']==1){flag=(flag && this.chars(val)); if(!this.chars(val)){error_text='Поле должно содержать только буквы'}};
                if (ch_list['mail']==1){flag=(flag && this.mail(val)); if(!this.mail(val)){error_text='Некорректный e-mail'}};
                if (ch_list['lenmin']!=''){flag=(flag && this.lenmin(val,(ch_list['lenmin']))); 
                if(!this.lenmin(val,(ch_list['lenmin']))){error_text='Поле должно быть не короче '+ch_list["lenmin"]+' символов'}};
                if (ch_list['phone_ch']==1){flag=(flag && this.phone_ch(val)); if(!this.phone_ch(val)){error_text='Некорректный номер телефона'}};
                if (ch_list['up']==1){this.up(val,obj);};          
                return flag;                                             
                }
            return true;
            }
		},
		init:function(form,error){                            //функция инициализации
			this.error_class = error ? error : this.error_class; //если передали код ошибки, присваеватся он. если нет -                                    // this на что тут ссылается? на проверяемый input?
			this.form = form ? form : this.form;                 //если передали форму, присваивается она, нет - по умолчанию
		},
		state: function(flag, obj){                           //присваиваем класс ошибки объекту
			if(flag){
				obj.removeClass(this.error_class);            //если ошибки нет-удаляем класс ошибки, и наоборот
                obj.attr('flag','1');
			}else{                                            //??вот это вообще не понятно зачем в отдельную функцию выносить
				obj.addClass(this.error_class);               //??и зачем добавление\удаление. типа для перепроверки? а значения не скидываются при повторной проверке?
                obj.attr('flag','0');
			}
		},
		defaultState: function(obj){                          //удаляем класс ошибки
			obj.removeClass(this.error_class);                //
		}
	}
	
	 
     $(function(){
        error_text='124';
        function checkForm(form){
        check.init($('#form_reg'),'RedError');            //передаем форму и класс ошибки
			//check.verify();                                   //проверка
            $('input[data-check]').focus(function(){        //фокус на элементе, удаляем класс ошибки focus				
                $(".reg_block4").css({'display':'none'});
                $(this).parent().find('.reg_block4').css({'display':'block'});
                check.defaultState($(this));
                if (($(this).attr('data-type')=="mphone")||($(this).attr('data-type')=="phone")){
                    $(this).mask("+7(999)999-99-99")
                }
			})
            
			$('input[data-check]').blur(function(){        //фокус на элементе, удаляем класс ошибки keydown blur
                check.verify($(this));
                $(".reg_block4").css({'display':'none'});
                if(error_text!=''){
                    var text = $(this).parent().find('.reg_block4').html();
                    $(this).parent().find('.reg_block4').attr('def_text',text);
                    $(this).parent().find('.reg_block4').css({'display':'block'});
                    $(this).parent().find('.reg_block4').text(error_text);
                }
                else if($(this).parent().find('.reg_block4').attr('def_text')){
                    text = $(this).parent().find('.reg_block4').attr('def_text');
                    $(this).parent().find('.reg_block4').html(text);
                }
                
                var mainFlag = 1;
                 
                $('input[data-check]').each(function(){
                    if($(this).attr('data-ch-i')==0){
                    mainFlag *= $(this).attr('flag');
                    }                    
                });
                var t=$(this).parent().parent().parent('div.mapreg').attr('id');
                if(mainFlag){
                //активируем кнопку далее                                                                                                                
                   $(".mapreg[id='"+t+"']").find("a.btn_forw_out_ina").removeClass("btn_forw_out_ina")
                        .addClass("btn_forw_out");
                }
                else{
                    $(".mapreg[id='"+t+"']").find("a.btn_forw_out").removeClass("btn_forw_out")
                        .addClass("btn_forw_out_ina");    
                }
                                 
			})

        } 
        
    var check = Check;	
	if($('#form_fback').size() > 0){                        //есть ли форма с id
	checkForm($(this));	                        
	}       
    });
}); 
	/*      --------------check -----------------      */
    
    /*-----------------submit--------------------------------------------------*/
    
 $(function(){
        $('form').submit(function(e){ //click
        e.preventDefault();
        var mainFlag = 1,
            $form = $(this);
        //alert('sucs') 
        
        $form.find('input[data-check]').each(function(){
            $(this).blur();
            mainFlag *= $(this).attr('flag')                    
        });
        
        $form.find('textarea[data-check]').each(function(){
            $(this).blur();
            mainFlag *= $(this).attr('flag')                    
        });
                
         if(mainFlag){
          //alert('sucs');
          $.ajax({
                method:'POST',
                url:$(this).attr('action')+'?isNaked=1',
				data:$(this).serialize(),
				success:function(callback){
				if(callback != ''){
					callback = $.parseJSON(callback);
					if(callback.action == 'success'){
                    $form.find('.cont_inf_sucs').fadeToggle("slow");
                    $form.find('input').val('');
                    $form.find('textarea').val('');
                    return;
                    }
				}
				}
			})   
         }
         else
         {
            //alert('unsacs');
         }
            
            
        });  
 });
 //*/   
/*-----------------submit--------------------------------------------------*/
$(function(){
    if( $('.prd_img').size() >0 ){
        var imageItemBlockTop = $('.prd_img').offset().top;
        $(window).scroll(function(){
                //if($(window).scrollTop() + $('.prd_img').height() + 32 < $('#Product_desc').offset().top + $('#Product_desc').height()){   

            if($(window).scrollTop() <= $('#Head').height() ){
                //alert(1);
                $('.prd_img').css({'top': 64 })
                $('.main_menu_string').attr('data-pos','1');
            }else if(($(window).scrollTop() >= imageItemBlockTop - 64)&&($(window).scrollTop() < $('#Product_desc').height() + $('#Head').height())){
                $('.prd_img').css({'top': $(window).scrollTop() - imageItemBlockTop + 64 + 32 });
                $('.main_menu_string').attr('data-pos','2');
            }else{
                $('.main_menu_string').attr('data-pos','0');
                $('.prd_img').css({'top': $(window).scrollTop() - imageItemBlockTop + 64 + 32 });
            }
    });
    }
    //      -----полоска scroll
     $('.main_menu_top').click(function(){
        //console.log($(this).closest('.main_menu_string'));
        if(($(this).closest('.main_menu_string').attr('data-pos') == '0')||($(this).closest('.main_menu_string').attr('data-pos') == '2')){
            $(window).scrollTop(0);
            $(this).closest('.main_menu_string').attr('data-pos','1') 
            //$(window).scrollTop($('#Head').height()); 
        };
     });
     
     $('.main_menu_bot').click(function(){
        console.log($(this).closest('.main_menu_string'));
        if(($(this).closest('.main_menu_string').attr('data-pos') == '1')||($(this).closest('.main_menu_string').attr('data-pos') == '2')){
            $(window).scrollTop($('#Cont_inf').offset().top );
            $(this).closest('.main_menu_string').attr('data-pos','0'); 
        };
     });   
    //      -----форма и закрывающий блок
    $('.cont_inf_sucs').click(function(){
        $(this).fadeToggle("slow");
    });
    
    $('.btn_fback').click(function(){
        $('#Form').fadeIn(250);
    });
    
    $('.form_close').click(function(){
        $('#Form').fadeOut(250);
    });
    
    /*-----------------Products-----------------------------*/
    $('.head_btn').click(function(){
        B2 = '';
        B2r = '';
        B2 = $(this).attr('b_id');
        
        
        $(this).attr('b_id') == 'B2B' ? B2r = 'B2C' : B2r = 'B2B';

        if(B2r){ //выключаем элементы с другим типом
             $('a.pr_elem[data-type="'+B2r+'"]').each(function(){
                $(this).fadeToggle(250);
                if($(this).attr('data-hide') == 'false'){
                    $(this).attr('data-hide','true');
                }else{
                    $(this).attr('data-hide','false');
                }
             })
        }
        
        $('.pr_group').each(function(){ //отключаем группу, если все спрятаны
            flag = true;
            if (!$(this).find('a.pr_elem').is(':not([data-hide="true"])')){
                $(this).fadeOut(250);
                //console.log('все спрятанны');
            }else{
                $(this).fadeIn(250);
                //console.log('есть неспрятанные');
            }
        })   
    });
/*-----------------line-----------------------------*/
});